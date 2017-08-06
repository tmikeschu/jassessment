# Word Watch 👀

---

## Environment Setup

Clone and navigate to the directory in your preferred way, or

```shell
git clone git@github.com:tmikeschu/jassessment.git
cd jassessment
```

then

Get those dependencies:

```shell
npm install
```

Open a dedicated terminal session to watch for changes in your JS:

```shell
npm run build
```

Open your app on a localhost server:

```shell
npm start
```

*Note* make sure to keep both `npm run build` and `npm start` running during your development.

## Objectives

* All JavaScript functions are backed by unit tests.
* You do not need to (and should not attempt to) add any HTML or CSS. Focus on the JavaScript.

### 1

As a user  
when I visit Word Watch  
and paste a paragraph into the "Paste text here" textarea  
and I click "Break down"  
Then I should see text appear on the right side of the page  
With each word from the paragraph only shown once  
and the size of each word is relative the frequency in the paragraph.  

### 2

As a user  
I can do the same thing as #1  
except instead of clicking "Break down"  
I can simply hit the return/enter key.  

### 3

As a user,  
when I visit Word Watch  
I should see the top used word and its count (based on the Word Watch API database)  
in the "Top Word: " heading.  
e.g., "Top Word: ciabatta (22)"  

### 4

For stories 1 and 2,
each word should be sent via POST request to the Word Watch API. See the
[repo](https://github.com/tmikeschu/wordwatch_api) for details.

### 5
For stories 1 and 2,
words should be compared case insensitive.
For example, ciabatta and Ciabatta and CIABATTA all count toward the count of ciabatta.


