package ibf2022.batch1.csf.assessment.server.utils;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import ibf2022.batch1.csf.assessment.server.models.Review;

public class MyUtils {
    public static JsonObject toJson(Review r) {
        JsonObjectBuilder job = Json.createObjectBuilder()
                .add("byline", r.getByline())
                .add("headline", r.getHeadline())
                .add("rating", r.getRating())
                .add("url", r.getReviewURL())
                .add("summary", r.getSummary())
                .add("title", r.getTitle());
        if (r.getImage() != null) {
            job.add("image", r.getImage());
        }
        return job.build();
    }
}