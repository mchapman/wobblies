//
//  WobbleEngine.m
//  Wobblies
//
//  Created by Douglas Livingstone on 26/05/2012.
//  Copyright (c) 2012 Douglas Livingstone. All rights reserved.
//

#import "WobbleEngine.h"

@implementation WobbleEngine

- (MKNetworkOperation *)pushImageToServer:(UIImage *)image
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithObjectsAndKeys:
                                   @"Douglas", @"user", nil];
    
    MKNetworkOperation *op = [self operationWithPath:@"upload"
                                              params:params
                                          httpMethod:@"POST"];
    
    NSData *data = UIImageJPEGRepresentation(image, 0.3);
    
    [op addData:data forKey:@"upload"];
    [op setFreezable:YES];
    
    [op onCompletion:^(MKNetworkOperation* completedOperation) { NSLog(@"Uploaded"); }
             onError:^(NSError* error) { NSLog(@"Error"); }];
    
    [op onUploadProgressChanged:^(double progress) { NSLog(@"Uploading... %f", progress); } ];
    
    [self enqueueOperation:op];
    return op;
}

@end
