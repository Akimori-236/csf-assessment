package ibf2022.batch1.csf.assessment.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ibf2022.batch1.csf.assessment.server.models.Review;
import ibf2022.batch1.csf.assessment.server.services.MovieService;
import jakarta.json.Json;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api")
public class MovieController {

	@Autowired
	private MovieService movieSvc;

	@GetMapping(path = "/search")
	public ResponseEntity<String> Task3SearchReview(@RequestParam String query) {

		List<Review> reviewList = movieSvc.searchReviews(query);

		String response = Json.createObjectBuilder()
				.add("test", "HEY WASSAP")
				.build()
				.toString();

		return ResponseEntity
				.status(HttpStatus.OK)
				.contentType(MediaType.APPLICATION_JSON)
				.body(response);
	}
	// TODO: Task 4, Task 8
}
