
#import "ViewController.h"
#import "MobileCoreServices/UTCoreTypes.h"

@implementation ViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    // local test server
    wobbleEngine = [[WobbleEngine alloc] initWithHostName:@"192.168.49.149"];
    
    // remote production server
//    wobbleEngine = [[WobbleEngine alloc] initWithHostName:@"ec2-184-72-89-97.compute-1.amazonaws.com"];

    [wobbleEngine setPortNumber:3000];
    [webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:@"http://192.168.49.149:3000/"]]];
}

- (void)viewDidUnload
{
    [super viewDidUnload];
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
}

- (IBAction)takePhoto:(id)sender
{
    bool overlayShown = [self startCameraController];
    
    // no camera in the simulator
    if (!overlayShown) {
        UIImage *dummyImage = [UIImage imageNamed:@"dummyImage.png"];
        [self onImageTaken:dummyImage];
    }
}

- (IBAction)toIntro:(id)sender
{
    [webView setHidden:YES];
    [imageView setHidden:NO];
}

- (void)loadUrl:(NSURL *)url
{
    [webView setHidden:NO];
    [imageView setHidden:YES];
    [webView loadRequest:[NSURLRequest requestWithURL:url]];
}

- (IBAction)toWebAppHome:(id)sender
{
    [self loadUrl:[NSURL URLWithString:@"http://192.168.49.149:3000/"]];
}

- (IBAction)toWebVideo:(id)sender
{
    [self loadUrl:[NSURL URLWithString:@"http://192.168.49.149:3000/#video"]];
}

- (IBAction)toWebPledge:(id)sender
{
    [self loadUrl:[NSURL URLWithString:@"http://192.168.49.149:3000/#pledgeto"]];
}

- (BOOL) startCameraController
{
    if ([UIImagePickerController isSourceTypeAvailable:UIImagePickerControllerSourceTypeCamera] == NO) {
        return NO;
    }
    
    UIImagePickerController *cameraUI = [[UIImagePickerController alloc] init];
    cameraUI.sourceType = UIImagePickerControllerSourceTypeCamera;
    cameraUI.mediaTypes = [NSArray arrayWithObject:(NSString*)kUTTypeImage];
    cameraUI.allowsEditing = NO;
    cameraUI.delegate = self;
    cameraUI.cameraOverlayView = [self createCameraOverlay];
    
    if ([UIImagePickerController isCameraDeviceAvailable:UIImagePickerControllerCameraDeviceFront])
    {
        cameraUI.cameraDevice = UIImagePickerControllerCameraDeviceFront;
    }
    
    [self presentModalViewController:cameraUI animated: YES];
    return YES;
}

- (void) imagePickerControllerDidCancel: (UIImagePickerController *) picker
{
    [self dismissModalViewControllerAnimated: YES];
}

- (void) imagePickerController: (UIImagePickerController *) picker
 didFinishPickingMediaWithInfo: (NSDictionary *) info
{
    UIImage *imageToSave = (UIImage *)[info objectForKey:UIImagePickerControllerOriginalImage];
    
    [self onImageTaken:imageToSave];
    
    [self dismissModalViewControllerAnimated: YES];
}

- (void)onImageTaken:(UIImage *)image
{
    [wobbleEngine pushImageToServer:image];
    [self toWebAppHome:nil];
}

- (UIView *)createCameraOverlay
{
    // assume there is an instance of UIImagePickerController* named picker...
    // assume that there is a UIImage* property named overlayImage...
    UIImageView *overlay = [[UIImageView alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    
    // with an image sized to fit in the viewfinder window
    // (Resize using Trevor Harmon's UIImage+ categories)
    overlay.image = [UIImage imageNamed:@"FatMan.png"];
    
    // tell the view to put the image at the top, and make it translucent
    overlay.contentMode = UIViewContentModeTop;            
    overlay.alpha = 0.5f;
    
    return overlay;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return interfaceOrientation == UIInterfaceOrientationPortrait;
}

@end
