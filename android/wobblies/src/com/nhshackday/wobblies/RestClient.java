package com.nhshackday.wobblies;

import org.apache.http.Header;
import org.apache.http.HeaderElement;
import org.apache.http.ParseException;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.impl.client.DefaultHttpClient;

import android.util.Log;

public class RestClient {

	void post(String url, int port, byte[] data) {
		try {
			DefaultHttpClient client = new DefaultHttpClient();
			HttpPost post = new HttpPost(url + ":" + port + "/upload");
			ByteArrayEntity entity = new ByteArrayEntity(data);
			post.setEntity(entity);
			post.addHeader("user", "android");
			client.execute(post);
		} catch (Exception e) {
			Log.e("RestClient Post", e.getMessage());
		}
	}
}
