package com.nhshackday.wobblies;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;

public class Login extends Activity {
    /** Called when the activity is first created. */
    
	//private EditText login = null;
	//private SharedPreferences sharedPreferences  = null;
	
	@Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login);
    
//        login = (EditText)findViewById(R.id.login);
//        
//        this.sharedPreferences = Login.this.getPreferences(MODE_PRIVATE);
//        if(this.sharedPreferences != null) {
//        	String email = this.sharedPreferences.getString("email", null);
//        	if(email != null) {
//        		this.startWobblis();
//        	}
//        }
    }
	
	private void startWobblis() {
		Intent intent = new Intent(Login.this, Wobblies.class);
		startActivity(intent);
	}
	
	private void startVideo() {
		Intent intent = new Intent(Login.this, Video.class);
		startActivity(intent);
	}
	
	public void watch(View view) {
		String url = "http://192.168.49.149:3000/";
		Intent i = new Intent(Intent.ACTION_VIEW);
		i.setData(Uri.parse(url));
		startActivity(i);
	}
	
	public void capture(View view) {
//		
//		String email = login.getText().toString();
//		if(email != null && email != "") {
//			Editor editor = this.sharedPreferences.edit(); 
//			editor.putString("email", email);
//			editor.commit();
//		}
		
		this.startWobblis();
	}
	
	public void video(View view) {
		this.startVideo();
	}
}