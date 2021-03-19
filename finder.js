function findImages() {
    let findings = [];

    //find img tags
    const imgs = document.querySelectorAll("img");
    [...imgs].map((img) => {
      findings.push(img.src);
    });

    //find elements with background-image
    const all = document.querySelectorAll('*');
    [...all].map((elem) => {
      let prop = window.getComputedStyle(elem, null).getPropertyValue('background-image');
      
      if (prop != 'none') {
        const srcChecker = /url\(\s*?['"]?\s*?(\S+?)\s*?["']?\s*?\)/i;
        let match = srcChecker.exec(prop);
        if (match) {
          findings.push(match[1]);
        }
      }
    });

    //creates and style elements to show the imgs with links to the user 
    const list = document.createElement('ul');
    list.id = 'foundImages';
    list.style.position = 'fixed';
    list.style.display = 'block';
    list.style.height = '100%';
    list.style.width = '300px';
    list.style.backgroundColor = 'white';
    list.style.backgroundColor = 'rgb(255 255 255 / 82%)';
    list.style.top = '0';
    list.style.right = '0';
    list.style.zIndex = '999999999';
    list.style.overflowY = 'scroll';
    list.style.listStyle = 'none';
    list.style.padding = '0';

    document.body.appendChild(list);
    //creates and loop a new array from a set of the findings to remove duplicates
    Array.from(new Set(findings)).map((img) => {
      let item = document.createElement('li');
      item.style.padding = '20px';
      let link = document.createElement('a');
      link.href = img;
      link.target = "_blank";
      link.style.display = 'block';
      link.style.width = '100%';
      link.style.height = '150px';
      link.style.backgroundColor = 'white';
      link.style.backgroundImage = 'url("'+img+'")';
      link.style.backgroundSize = 'cover';
      link.style.backgroundPosition = 'center';

      item.appendChild(link);
      list.appendChild(item);
    });
    
  }

  chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: findImages
    });
  });
  

/*
- references: 
https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/examples/page-redder
https://blog.crimx.com/2017/03/09/get-all-images-in-dom-including-background-en/
- extension icon:
made by Freepik from www.flaticon.com
*/