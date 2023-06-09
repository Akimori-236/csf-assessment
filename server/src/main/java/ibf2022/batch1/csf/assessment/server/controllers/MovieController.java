package ibf2022.batch1.csf.assessment.server.controllers;

import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ibf2022.batch1.csf.assessment.server.models.Review;
import ibf2022.batch1.csf.assessment.server.services.MovieService;
import ibf2022.batch1.csf.assessment.server.utils.MyUtils;
import jakarta.json.JsonObject;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class MovieController {

	@Autowired
	private MovieService movieSvc;

	@GetMapping(path = "/search")
	public ResponseEntity<String> Task3SearchReview(@RequestParam String query) {
		// get response
		List<Review> reviewList = movieSvc.searchReviews(query);
		// invalid search term return empty
		if (reviewList.size() == 0) {
			return ResponseEntity
					.status(HttpStatus.OK)
					.contentType(MediaType.APPLICATION_JSON)
					.body("[]");
		}
		// build json
		List<JsonObject> jList = reviewList.stream()
				.map(v -> MyUtils.toJson(v))
				.toList();

		System.out.println(jList.toString());
		return ResponseEntity
				.status(HttpStatus.OK)
				.contentType(MediaType.APPLICATION_JSON)
				.body(jList.toString());
	}

	@PostMapping(path = "/comment", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> insertComment(
			@RequestParam String movieName,
			@RequestParam String posterName,
			@RequestParam Integer rating,
			@RequestParam String commentText) {
		// build document
		Document comment = new Document();
		comment.put("movieName", movieName);
		comment.put("posterName", posterName);
		comment.put("rating", rating);
		comment.put("commentText", commentText);
		System.out.println("COMMENT >>> " + comment);

		movieSvc.insertComment(comment);
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.contentType(MediaType.APPLICATION_JSON)
				.body(null);
	}
}
