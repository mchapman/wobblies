//
//  ViewController.h
//  Wobblies
//
//  Created by Douglas Livingstone on 26/05/2012.
//  Copyright (c) 2012 Douglas Livingstone. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "WobbleEngine.h"

@interface ViewController : UIViewController <UIImagePickerControllerDelegate, UINavigationControllerDelegate>
{
    WobbleEngine *wobbleEngine;
    UIImage *lastImage;
    IBOutlet UIWebView *webView;
    IBOutlet UIImageView *imageView;
}

- (BOOL) startCameraController;
- (IBAction)takePhoto:(id)sender;
- (IBAction)toWebApp:(id)sender;
- (void) imagePickerControllerDidCancel:(UIImagePickerController *)picker;
- (void) imagePickerController:(UIImagePickerController *)picker
 didFinishPickingMediaWithInfo:(NSDictionary *)info;
- (void)onImageTaken:(UIImage *)image;

@end
