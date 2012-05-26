package com.nhshackday.wobblies;

import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.impl.client.DefaultHttpClient;

import android.util.Log;

public class RestClient {

	void post(String url, int port, byte[] data) {
		try {
			DefaultHttpClient client = new DefaultHttpClient();
			HttpPost post = new HttpPost(url + ":" + port);
			ByteArrayEntity entity = new ByteArrayEntity(data);
			post.setEntity(entity);
			client.execute(post);
		} catch (Exception e) {
			Log.e("RestClient Post", e.getMessage());
		}
	}
}
