"use strict";

////////////////////////////////////////////////////////////////////////////  BLOG SECTION

const left_side = document.querySelector(".left_side_of_page");
const first_section = document.querySelector(".first_section");
const blog = document.querySelector(".blog");
const blog_title = document.querySelector(".blog_title");
const blog_title_time = document.querySelector(".blog_title_time");
const blog_img = document.querySelector(".blog_img");
const blog_text = document.querySelector(".blog_text");

// URL for get and post
const url = "http://localhost:3000/posts";
const xhr = new XMLHttpRequest();

function getAllPosts() {
  let htmlBlog = "";

  // Get request with definig HTML elemenst for blog content
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);

      for (let i = 0; i < data.length; i++) {
        htmlBlog = `
        <div class="blog">
        <div class="blog_title">
          <h1>${data[i].titleHeding}</h1>
          <p>
            ${data[i].titleDescription},
            <span class="blog_title_time">${data[i].date}</span>
          </p>
        </div>
        <div class="blog_img">
        ${
          data[i].imageOfStory
            ? `<img
              src="${data[i].imageOfStory}"
              alt="nature photo"
              width="100%"
            />`
            : `<p class="no_photo">Sory there is no photo of the story owner.</p>`
        }
        </div>
        <div class="blog_text${data[i].id}">
        <p class="short_text${data[i].id} short">
            ${data[i].textStory.slice(0, 90)}...
          </p>
          <p class="whole_text${data[i].id} whole">
            ${data[i].textStory}
          </p>
        </div>
        <div class="show_more_text">
          <button class="show_more_btn" onclick="showMoreText(${
            data[i].id
          })">Show more story...</button>
        </div>
      </div>`;
        // Making all posts vissible in correct way
        blog.insertAdjacentHTML("afterend", htmlBlog);
      }
    }
  };
  xhr.send(null);
}

// Calling all posts from server
getAllPosts();

// ADDING AND REMOVING TEXT STORY ON CLICK

function showMoreText(storyId) {
  // GET REQUEST
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    // TAKING ALL INFOS
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      // MAKING THE CONTROL PATH FOR CLICKING AND MATCHING THE ID WITH BLOG STROY
      for (let i = 0; i < json.length; i++) {
        // GETTING CLICKED STORY
        // creating separate class names
        const blogText = document.querySelector(`.blog_text${json[i].id}`);
        const wholeText = document.querySelector(`.whole_text${json[i].id}`);
        const shortText = document.querySelector(`.short_text${json[i].id}`);

        if (json[i].id === storyId) {
          //invoking style
          // this one is makig that the story need to be one below other
          wholeText.classList.toggle("short");

          // This one need to remove one story and add another one
          shortText.classList.toggle("whole");
          shortText.classList.toggle("short");
        }
      }
    }
  };
  xhr.send(null);
}

//////////////////////////////////////////////////////////////////////////// SEND STORY
const title = document.querySelector(".title");
const descriiption = document.querySelector(".descriiption");
const name = document.querySelector(".name");
const email = document.querySelector(".email");
const message = document.querySelector(".form_message");
const image = document.querySelector(".image");
const btn = document.querySelector(".btn");

// Adding event listener on btn for sending post reques
btn.addEventListener("click", sendNewBlogStory);

let inputIsEmpty = true;

function sendNewBlogStory(e) {
  e.preventDefault();

  // TITLE
  if (
    title.value.trim() == "" ||
    title.value.trim() !=
      title.value.trim().slice(0, 1).toUpperCase() +
        title.value.trim().slice(1, title.value.trim().length).toLowerCase()
  ) {
    inputIsEmpty = false;
    title.classList.add("active");
  } else {
    title.classList.remove("active");
    inputIsEmpty = true;
  }

  // DESCRIPTION
  if (descriiption.value.trim() == "") {
    inputIsEmpty = false;
    descriiption.classList.add("active");
  } else {
    descriiption.classList.remove("active");
    inputIsEmpty = true;
  }

  // NAME
  if (
    name.value.trim() == "" ||
    name.value.trim() !=
      name.value.trim().slice(0, 1).toUpperCase() +
        name.value.trim().slice(1, name.value.trim().length).toLowerCase()
  ) {
    name.classList.add("active");
    inputIsEmpty = false;
  } else {
    name.classList.remove("active");
    inputIsEmpty = true;
  }

  // EMAIL
  if (
    email.value.trim() == "" ||
    email.value.trim().includes("@") == false ||
    email.value.trim().includes(".com") == false
  ) {
    email.classList.add("active");
    inputIsEmpty = false;
  } else {
    email.classList.remove("active");
    inputIsEmpty = true;
  }

  //MESSAGE
  if (message.value.trim().length <= 10) {
    message.classList.add("active");
    inputIsEmpty = false;
  } else {
    message.classList.remove("active");
    inputIsEmpty = true;
  }

  // IMAGE

  if (image.value === "") {
    image.classList.add("active");
    inputIsEmpty = false;
  } else {
    image.classList.remove("active");
    inputIsEmpty = true;
  }

  // Post request
  if (inputIsEmpty) {
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        console.log(json);
      }
    };

    // Making a real time string
    let realDate = new Date();
    let h = realDate.getHours();
    let m = realDate.getMinutes();
    let month = realDate.getMonth();
    let hour = h < 10 ? "0" + h : h;
    let minut = m < 10 ? "0" + m : m;
    const monthAll = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Making new data
    let data = JSON.stringify({
      titleHeding: title.value,
      titleDescription: descriiption.value,
      imageOfStory: image.value,
      name: name.value,
      email: email.value,
      textStory: message.value,
      date: monthAll[month] + "," + " " + hour + ":" + minut,
    });

    // Sending data
    xhr.send(data);

    // Emptying input fileds
    title.value =
      descriiption.value =
      name.value =
      email.value =
      message.value =
        "";

    //Reloding the window so you can see story
    window.location.reload();
  } else {
    alert("Something went wrong!");
  }
}

/////////////////////////////////////////////////////////////////////////////  TAKE ME TO CURRENT STORY
function takeMeToCurrentStory(blogStoryId) {
  console.log(blogStoryId);

  let html = "Hello";
  //open new Page
  window.open("blog_html/blog.html");

  
}
