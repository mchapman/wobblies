package com.nhshackday.wobblies;

import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.ByteArrayBody;
import org.apache.http.impl.client.DefaultHttpClient;

import android.util.Log;

public class RestClient {

	void post(String url, int port, byte[] data, String fileName) {
		try {
			DefaultHttpClient client = new DefaultHttpClient();
			HttpPost post = new HttpPost(url + ":" + port + "/upload");
			
			MultipartEntity entity = new MultipartEntity(HttpMultipartMode.BROWSER_COMPATIBLE);
			ByteArrayBody img = new ByteArrayBody(data, "capture.jpg");
			entity.addPart("upload", img);
	    	post.setEntity(entity);
			post.addHeader("user", "android");
			HttpResponse response = client.execute(post);
			if (response.getStatusLine().getStatusCode() != HttpStatus.SC_OK) {
				Log.e("RestClient", "Failed to upload image "
						+ response.getStatusLine().getStatusCode());
			}
		} catch (Exception e) {
			Log.e("RestClient Post", e.getMessage());
		}
	}
}