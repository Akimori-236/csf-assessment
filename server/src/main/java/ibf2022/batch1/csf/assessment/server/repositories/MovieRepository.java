package ibf2022.batch1.csf.assessment.server.repositories;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class MovieRepository {

	public static final String COLLECTION_COMMENTS = "comments";
	public static final String FIELD_MOVIENAME = "movieName";
	@Autowired
	private MongoTemplate template;

	// TODO: Task 5
	// You may modify the parameter but not the return type
	// Write the native mongo database query in the comment below
	// db.comments.find({movieName: "###"}).count()
	public int countComments(String movieName) {
		Criteria criteria = Criteria.where(FIELD_MOVIENAME).is(movieName);
		Query query = Query.query(criteria);

		return (int) template.count(query, COLLECTION_COMMENTS);
	}

	// TODO: Task 8
	// Write a method to insert movie comments comments collection
	// Write the native mongo database query in the comment below
	// db.comment.insert({movieName:"###", posterName:"###", rating:"###",
	// commentText:"###",})
	public void insertComment(Document comment) {
		template.insert(comment, COLLECTION_COMMENTS);
	}
}
