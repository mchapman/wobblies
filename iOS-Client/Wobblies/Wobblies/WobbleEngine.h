//
//  WobbleEngine.h
//  Wobblies
//
//  Created by Douglas Livingstone on 26/05/2012.
//  Copyright (c) 2012 Douglas Livingstone. All rights reserved.
//

#import "MKNetworkEngine.h"

@interface WobbleEngine : MKNetworkEngine

- (MKNetworkOperation *)pushImageToServer:(UIImage *)image;

@end
