package com.hellox;
import android.os.Bundle; // <- add necessary import
import com.facebook.react.ReactActivity;
import com.zoontek.rnbootsplash.RNBootSplash; // <- add necessary import

public class MainActivity extends ReactActivity {


  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    RNBootSplash.show(R.drawable.bootsplash, MainActivity.this); // <- display the "bootsplash" xml view over our MainActivity
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "HelloX";
  }

  


}
