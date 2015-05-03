# Setting up the presentation. #

MajorTom presentations are defined by a simple JSON format, please note that while MajorTom isn't a stable release the format of the JSON file might be subject to minor changes.

A simple array is defined ([]) and contains objects ({}), each object must have the following:

* title:   What will be shown in the list of sections.
* type:    This is used to provide a handle back to the client JS to know what HTML elements to render on the page.
* content: This is what will actually be displayed on the page, text is just embedded videos require and array of sources and animations are animated and thus have a content of none.

>[
>  {
>    "title": "Text Example",
>    "type": "text",
>    "content": "Text<br/>Example"
>  },
>  {
>    "title": "Video Demo",
>    "type": "video",
>    "autoplay": true,
>    "controls": true,
>    "content": [
>      "videos/PX.mp4",
>      "videos/PX.ogg"
>    ]
>  },
>  {
>    "title": "OpenGL Example",
>    "type": "animation",
>    "content": "None"
>  }
>]
