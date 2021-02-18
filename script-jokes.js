function onClick(e) {
    e.preventDefault();
    // get category values

    let s = document.getElementById('selector');
    let type = s.options[s.selectedIndex].value;
    if (type ==="") {
        type = "Any";
    }

    // setup URL
    let url = "https://v2.jokeapi.dev/joke/" + type + "?blacklistFlags=nsfw,racist,sexist,explicit";
    // call API
    fetch(url)
      .then(function(response) {
        // make sure the request was successful
        if (response.status != 200) {
          return {
            text: "Error calling the Jokes API service: " + response.statusText
          }
        }
        return response.json();
      }).then(function(json) {
        // update DOM with response
        flaggedContent = "Flags: "
        let needsComma = false;
        if (json.flags.explicity) {
          flaggedContent += " Explicit" ;
          needsComma = true;
        }
        if(json.flags.nsfw) {
          if(needsComma) {
            flaggedContent += ", NSFW";
            
          } else {
            flaggedContent += " NSFW";
            needsComma = true;

          }
        }
        if(json.flags.political) {
          if(needsComma) {
            flaggedContent += ", Political";
          } else {
            flaggedContent += " Political";
            needsComma = true;

          }
        }
        if(json.flags.racist) {
          if(needsComma) {
            flaggedContent += ", Racist";
          } else {
            flaggedContent += " Racist";
            needsComma = true;

          }
        }
        if(json.flags.religious) {
          if(needsComma) {
            flaggedContent += ", Religious";
          } else {
            flaggedContent += " Religious";
            needsComma = true;

          }
        }
        if(json.flags.sexist) {
          if(needsComma) {
            flaggedContent += ", Sexist";
          } else {
            flaggedContent += " Sexist";
          }
        }
        if(flaggedContent === "Flags: ") {
          flaggedContent = " No Flags found"
        }

        if(json.type === "twopart") {
          result = json.setup + " " + json.delivery;
          category = "Type: " + json.category;
          updateResult(result, category, flaggedContent);
        }
        else if(json.type === "single") {
            category = "Type: " + json.category;
            updateResult(json.joke, category, flaggedContent)
        }
      });
  }
  
  function updateResult(info,cat, flags) {
    document.getElementById('result').textContent = info;
    document.getElementById('category').textContent = cat;
    document.getElementById('flags').textContent = flags;
  }
  
  document.getElementById('generate').addEventListener('click', onClick);
  