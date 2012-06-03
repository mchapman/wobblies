
#import <UIKit/UIKit.h>
#import "WobbleEngine.h"

@interface ViewController : UIViewController <UIImagePickerControllerDelegate, UINavigationControllerDelegate>
{
    WobbleEngine *wobbleEngine;
    IBOutlet UIWebView *webView;
    IBOutlet UIImageView *imageView;
}

- (BOOL) startCameraController;
- (IBAction)takePhoto:(id)sender;
- (IBAction)toWebAppHome:(id)sender;
- (IBAction)toWebVideo:(id)sender;
- (IBAction)toWebPledge:(id)sender;
- (void) imagePickerControllerDidCancel:(UIImagePickerController *)picker;
- (void) imagePickerController:(UIImagePickerController *)picker
 didFinishPickingMediaWithInfo:(NSDictionary *)info;
- (void)onImageTaken:(UIImage *)image;

@end
