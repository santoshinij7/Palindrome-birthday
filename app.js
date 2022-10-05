// Reversing the order of the date
function reverseString(str) {
    var ListOfChars = str.split("");
    var reverseListOfChars = ListOfChars.reverse();
    var reversedString = reverseListOfChars.join("");
    return reversedString;
      //The above program in one line.
     // return str.split("").reverse().join("");
  }
  
  // Comparing reversed date to actual date
  function isPalindrome(str) {
      var reversedString = reverseString(str);
  
      if (str === reversedString) {
          return true;
      }
      return false;
  }
  
  // Adding '0' to single digit value in date
  function convertDateToStr(date) {
      var dateStr = {
          day: "",
          month: "",
          year: ""
      };
  
      if (date.day < 10) {
          dateStr.day = "0" + date.day;
      } else {
          dateStr.day = date.day.toString();
      }
  
      if (date.month < 10) {
          dateStr.month = "0" + date.month;
      } else {
          dateStr.month = date.month.toString();
      }
  
      if (date.year < 10) {
          dateStr.year = "0" + date.year;
      } else {
          dateStr.year = date.year.toString();
      }
  
      return dateStr;
  }
  
  // Getting all formats of date
  function getAllDateFormats(date) {
      var dateStr = convertDateToStr(date);
  
      var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
      var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
      var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
      var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
      var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
      var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  
      return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  }
  
  // Checking if any format of date forms a palindrome date
  function checkPalindromeForAllDateFormats(date) {
      var listOfPalindromes = getAllDateFormats(date);
  
      var flag = false;
  
      for (let i = 0; i < listOfPalindromes.length; i++) {
          if (isPalindrome(listOfPalindromes[i])) {
              flag = true;
              break;
          }
      }
  
      return flag;
  }
  
  // Check for leap year
  function isLeapYear(year) {
      if (year % 400 === 0) {
          return true;
      }
      if (year % 100 === 0) {
          return false;
      }
      if (year % 4 === 0) {
          return true;
      }
      return false;
  }
  
  // Moving to next date
  function getNextDate(date) {
      var day = date.day + 1;
      var month = date.month;
      var year = date.year;
  
      var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
      // Check for leap year
      if (month === 2) {
          if (isLeapYear(year)) {
              if (day > 29) {
                  day = 1;
                  month++;
              }
          } else {
              if (day > 28) {
                  day = 1;
                  month++;
              }
          }
      } else {
          if (day > daysInMonth[month - 1]) {
              day = 1;
              month++;
          }
      }
  
      if (month > 12) {
          month = 1;
          year++;
      }
  
      return {
          day: day,
          month: month,
          year: year,
      };
  }
  
  // Moving to previous date
  function getPreviousDate(date) {
      var day = date.day - 1;
      var month = date.month;
      var year = date.year;
  
      var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
      if (month === 2) {
          if (isLeapYear(year)) {
              if (day < 1) {
                  day = 29;
                  month--;
              }
          } else {
              if (day < 1) {
                  day = 28;
                  month--;
              }
          }
      } else {
          if (day < 1) {
              month--;
              if (month < 1) {
                  month = 12;
                  year--;
              }
              day = daysInMonth[month - 1];
          }
      }
      //   if(month < 1){
      //     month = 12;
      //     year--;
      //   }
  
      return {
          day: day,
          month: month,
          year: year,
      };
  }
  
  // Checking if the next date is palindrome
  function getNextPalindromeDate(date) {
      var counter = 0;
      var nextDate = getNextDate(date);
  
      while (1) {
          counter++;
          var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
          if (isPalindrome) {
              break;
          }
          nextDate = getNextDate(nextDate);
      }
  
      return [counter, nextDate];
  }
  
  // Checking if the previous date is palindrome
  function getPreviousPalindromeDate(date) {
      var counter = 0;
      var previousDate = getPreviousDate(date);
  
      while (1) {
          counter++;
          var isPalindrome = checkPalindromeForAllDateFormats(previousDate);
          if (isPalindrome) {
              break;
          }
          previousDate = getPreviousDate(previousDate);
      }
  
      return [counter, previousDate];
  }
  
  var dateInput = document.querySelector("#bday-input");
  var showButton = document.querySelector("#show-button");
  var result = document.querySelector("#result");
  
  function clickHandler(e) {
      var bdayStr = dateInput.value;
  
      // Checking if birthday string is not empty
      if (bdayStr != "") {
          var listOfDate = bdayStr.split("-");
          //Storing the values of date into an object
          var date = {
              day: Number(listOfDate[2]),
              month: Number(listOfDate[1]),
              year: Number(listOfDate[0]),
          };
  
          // Function call for checking if the birthdate is a palindrome date
          var isPalindrome = checkPalindromeForAllDateFormats(date);
  
          // Printing results to UI
          if (isPalindrome) {
              result.innerText = "Yay! your birthday is a palindrome.";
          } else {
              var [counterMinus, previousDate] = getPreviousPalindromeDate(date);
              var [counterPlus, nextDate] = getNextPalindromeDate(date);
              result.innerText =
                  "The previous palindrome date was " +
                  previousDate.day +
                  "-" +
                  previousDate.month +
                  "-" +
                  previousDate.year +
                  " and you are " +
                  counterMinus +
                  " days ahead." + "\n" +
                  " And, the next panlindrome date is " +
                  nextDate.day +
                  "-" +
                  nextDate.month +
                  "-" +
                  nextDate.year +
                  " and you are " +
                  counterPlus +
                  " days behind.";
          }
      }
  }
  showButton.addEventListener("click", clickHandler);