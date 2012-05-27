package com.nhshackday.wobblies;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.ContentValues;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.widget.ImageView;
import android.widget.Toast;

public class Wobblies extends Activity {

	private ImageView image = null;
	private String fileName = null;
	private String imageName = null;
	private Uri imageUri = null;
	private ProgressDialog progressDialog = null;
	private final static String host = "http://192.168.49.149";
	private final static int port = 3000;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.wobblies);
		image = (ImageView) findViewById(R.id.image);

		this.getUri();
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		MenuInflater menuInflater = getMenuInflater();
		menuInflater.inflate(R.menu.picture, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
		case R.id.menu_camera:
			this.Camera();
			break;
		case R.id.menu_upload:
			this.upload();
			break;
		default:
			return super.onOptionsItemSelected(item);
		}

		return true;
	}

	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
		if (requestCode != 0) {
			return;
		}

		if (resultCode != Activity.RESULT_OK) {
			return;
		}

		this.UpdateImage();
	}

	private void UpdateImage() {
		if (this.imageUri != null) {
			this.setImage(this.imageUri);
			this.fileName = getRealPathFromURI(this.imageUri);
		}
	}

	private void Camera() {
		this.imageName = "wobblies" + System.currentTimeMillis() + ".jpg";
		ContentValues values = new ContentValues();
		values.put(MediaStore.Images.Media.TITLE, this.imageName);
		values.put(MediaStore.Images.Media.DESCRIPTION,
				"Image capture by camera");
		this.imageUri = getContentResolver().insert(
				MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values);

		Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
		intent.putExtra(MediaStore.EXTRA_OUTPUT, imageUri);
		startActivityForResult(intent, 0);
	}

	private void setImage(Uri uri) {
		if (image == null) {
			return;
		}

		try {
			image.setImageURI(uri);
		} catch (Exception exception) {
			Log.e("Wobblies", exception.getMessage());
		}
	}

	private void getUri() {
		Intent intent = getIntent();
		Bundle bundle = getIntent().getExtras();
		if (bundle != null) {
			if (Intent.ACTION_SEND.equals(intent.getAction())) {
				this.imageUri = (Uri) bundle.get("android.intent.extra.STREAM");
				this.setImage(this.imageUri);
				this.fileName = getRealPathFromURI(this.imageUri);
				Log.e("file name", fileName);
			}
		}
	}

	@Override
	protected void onResume() {
		super.onResume();
		this.getUri();
	}

	public String getRealPathFromURI(Uri contentUri) {
		String[] proj = { MediaStore.Images.Media.DATA };
		Cursor cursor = managedQuery(contentUri, proj, // Which columns to
				// return
				null, // WHERE clause; which rows to return (all rows)
				null, // WHERE clause selection arguments (none)
				null); // Order-by clause (ascending by name)
		int column_index = cursor
				.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
		cursor.moveToFirst();
		return cursor.getString(column_index);
	}

	private void upload() {
		if (this.fileName == null) {
			showError("Ni image to upload");
			return;
		}

		 this.progressDialog = ProgressDialog.show(this, "Please wait...", "Uploading image", true, false);
		
		 try {
			RestClient restClient = new RestClient();
			byte[] data = getImageBytes();
			restClient.post(host, port, data, this.fileName);
		} catch (Exception e) {
			Log.e("Wobbies", e.getMessage());
		}
		finally {
			this.progressDialog.dismiss();
		}
	}

	private byte[] getImageBytes() throws Exception {
		final ByteArrayOutputStream dataStream = new ByteArrayOutputStream();

		File file = new File(this.fileName);
		int size = (int) file.length();
		FileInputStream fs = new FileInputStream(file);

		InputStream in = new BufferedInputStream(fs);
		BufferedOutputStream out = new BufferedOutputStream(dataStream,
				(int) size);
		copy(in, out, (int) size);
		out.flush();
		in.close();
		out.close();
		final byte[] data = dataStream.toByteArray();
		dataStream.close();
		return data;
	}

	private static void copy(InputStream in, OutputStream out, int size)
			throws IOException {
		byte[] b = new byte[size];
		int read;
		while ((read = in.read(b)) != -1) {
			out.write(b, 0, read);
		}
	}

	private void showError(String error) {
		Toast.makeText(Wobblies.this, error, Toast.LENGTH_LONG).show();
	}
}
