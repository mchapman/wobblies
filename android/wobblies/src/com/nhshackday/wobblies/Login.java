package com.nhshackday.wobblies;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

public class Login extends Activity {
    /** Called when the activity is first created. */
    
	private EditText login = null;
	private SharedPreferences sharedPreferences  = null;
	
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
	
	public void login(View view) {
//		
//		String email = login.getText().toString();
//		if(email != null && email != "") {
//			Editor editor = this.sharedPreferences.edit(); 
//			editor.putString("email", email);
//			editor.commit();
//		}
		
		this.startWobblis();
	}
}