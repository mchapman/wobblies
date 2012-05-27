//
//  ViewController.m
//  Wobblies
//
//  Created by Douglas Livingstone on 26/05/2012.
//  Copyright (c) 2012 Douglas Livingstone. All rights reserved.
//

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

    [wobbleEngine setPortNumber:80];
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
        [wobbleEngine pushImageToServer:dummyImage];
    }
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
    
    [wobbleEngine pushImageToServer:imageToSave];
    
    [self dismissModalViewControllerAnimated: YES];
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    if ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPhone) {
        return (interfaceOrientation != UIInterfaceOrientationPortraitUpsideDown);
    } else {
        return YES;
    }
}

@end
