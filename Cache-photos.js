CACHE PHOTOS

Code for the responsive images, because images can appear at a variety of
different widths.

This responsive image lets the browser decide which image to load based on the
width of the window and also the network conditions and also the network
conditions

Which version should it choose?
We wait for the browser to make the request, then we hear about it in the
service worker, we go to the network for the image and once we get a response,
we put it in the cache. But the same time we send it on to the page.

EXAMPLE:

<img src = "/photos/65152-800px.jpg"
  srcset = "/photos/65152-1024px.jpg 1024w,
            /photos/65152-800px.jpg 800w,
            /photos/65152-640px.jpg 640w,
            /photos/65152-320px.jpg 320w,
            /photos/65152-800px.jpg 800w"
  sizes = "(min-width: 800px) 765px,
           (min-width: 600px) calc(100vw - 32px),
           calc(100w - 16px)">

IMPORTANT TIP:
You can only use the body of a response, once. As in, if you read the responses
JSON, you cannot then read it as a blob, this is because the original data
has gone, keeping it in memory would be a waste.

EXAMPLE:
response.json();

wont work 2nd time because original data is gone and not in the memory
response.blob();

this wont work either
event.respondWith(response);



CLONING THE RESPONSE WE SENT TO THE cache

However this is a problem for our photos, we want to open a cache, fetch from
the network, and send the response to both the cache and back to the browser.
Using the body twice like this doesnt work. But we can fix this by cloning the
response we send to the cache.

So now a clone goes to the cache, and the original gets sent back to the page.
The browser keeps enough of the original request around to satisfy all of the
clones.

EXAMPLE:

event.respondWith(
  caches.open('wittr-content-imgs').then(function(cache) {
    return fetch(request).then(function(response) {
      cache.put(request, response.clone());
      return response;
    });
  })
);
