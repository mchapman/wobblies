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
    MKNetworkOperation *op = [self operationWithPath:@"upload"
                                              params:nil
                                          httpMethod:@"POST"];
    
    NSMutableDictionary *headers = [[NSMutableDictionary alloc] initWithObjectsAndKeys:
                                    @"Douglas", @"user", nil];
    [op addHeaders:headers];
    
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
