package ibf2022.batch1.csf.assessment.server.services;

import java.io.StringReader;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import ibf2022.batch1.csf.assessment.server.models.Review;
import ibf2022.batch1.csf.assessment.server.repositories.MovieRepository;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;;

@Service
public class MovieService {
	private static final String NYTIMES_URL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";

	@Value("${api.key}")
	private String privateKey;

	@Autowired
	private MovieRepository movieRepo;

	// TODO: Task 4
	// DO NOT CHANGE THE METHOD'S SIGNATURE
	public List<Review> searchReviews(String query) {
		// example call
		// https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=godfather&api-key=**********
		String url = UriComponentsBuilder.fromUriString(NYTIMES_URL)
				.queryParam("query", query)
				.queryParam("api-key", privateKey)
				.build()
				.toUriString();
		// REQUEST CONTAINER
		RequestEntity<Void> request = RequestEntity.get(url)
				.accept(MediaType.APPLICATION_JSON)
				.build();
		RestTemplate template = new RestTemplate();
		String responseBody = "";
		try {
			ResponseEntity<String> response = template.exchange(request, String.class);
			responseBody = response.getBody();
		} catch (Exception e) {
			e.printStackTrace();
			return new LinkedList<Review>();
		}
		// read response
		JsonReader reader = Json.createReader(new StringReader(responseBody));
		JsonObject responseObj = reader.readObject();
		// on invalid return empty list
		if (responseObj.isNull("results")) {
			return new LinkedList<Review>();
		}
		JsonArray results = responseObj.getJsonArray("results");

		List<Review> reviewList = results.stream()
				.map(v -> v.asJsonObject())
				.map(v -> this.reviewMarshalling(v))
				.toList();
		return reviewList;
	}

	private Review reviewMarshalling(JsonObject jObj) {
		Review r = new Review();
		r.setTitle(jObj.getString("display_title"));
		r.setRating(jObj.getString("mpaa_rating"));
		r.setByline(jObj.getString("byline"));
		r.setHeadline(jObj.getString("headline"));
		r.setSummary(jObj.getString("summary_short"));
		r.setReviewURL(jObj.getJsonObject("link").getString("url"));
		if (!jObj.isNull("multimedia")) {
			r.setImage(jObj.getJsonObject("multimedia").getString("src"));
		}
		// retrieve comment count (Task 5)
		r.setCommentCount(movieRepo.countComments(r.getTitle()));
		return r;
	}
}
