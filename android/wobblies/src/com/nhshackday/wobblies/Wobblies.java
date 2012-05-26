package com.nhshackday.wobblies;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;

import org.xml.sax.InputSource;

import android.app.Activity;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.Toast;

public class Wobblies extends Activity {

	private ImageView image = null;
	private String fileName = null;
	private Uri fileUri = null;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.wobblies);
		image = (ImageView) findViewById(R.id.image);
		this.getUri();
		upload(null);
	}

	private void setImage(Uri uri) {
		if (image == null) {
			return;
		}

		image.setImageURI(uri);
	}

	@Override
	protected void onRestart() {
		// TODO Auto-generated method stub
		super.onRestart();
		this.getUri();
	}

	@Override
	protected void onResume() {
		super.onResume();
		this.getUri();
	}

	private void getUri() {
		Intent intent = getIntent();
		Bundle bundle = getIntent().getExtras();
		if (bundle != null) {
			if (Intent.ACTION_SEND.equals(intent.getAction())) {
				this.fileUri = (Uri) bundle.get("android.intent.extra.STREAM");
				this.setImage(this.fileUri);
				this.fileName = getRealPathFromURI(this.fileUri);
				Log.e("file name", fileName);
			}
		}
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

	private void delete(View view) {
		if (this.fileName == null) {
			showError("Ni image to delete");
			return;
		}
		
	}

	private void upload(View view) {
		if (this.fileName == null) {
			showError("Ni image to upload");
			return;
		}

		try
		{
			
		RestClient restClient = new RestClient();

		Bitmap bmp= BitmapFactory.decodeFile(this.fileName);
		ByteArrayOutputStream stream = new ByteArrayOutputStream();
		bmp.compress(Bitmap.CompressFormat.PNG, 25, stream);
		byte[] data = new byte[100];
		byte inc = 0;
		for(byte value :data) {
			value = inc++;
		}
		restClient.post("http://192.168.49.149/upload", 3000, data);
		
		}
		catch(Exception e) {
			
		}
	}

	private void showError(String error) {
		Toast.makeText(Wobblies.this, error, Toast.LENGTH_LONG).show();
	}
}
