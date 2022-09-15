// Class game. Controls the input/output and interface
function Game() {
    var processor;
    var maxLength = 9;
    // Starting view and input
    var setUp = document.getElementById("initial");
    var setUpInput = document.getElementById("guessLength");
    var start = document.getElementById("start");
    // In game view and input
    var inGame = document.getElementById("inGame");
    var inGameFields = document.getElementById("userInput");
    var inGameInput = document.getElementById("userGuess");
    var guess = document.getElementById("guess");
    var reset = document.getElementById("reset");
    // result, errors view and extra output
    var results = document.getElementById("log");
    var errors = document.getElementById("error");
    var hidden = document.getElementById("pcGuess");
    var success = document.getElementById("success");
    var reverse = document.getElementById("reverse");
    reset.addEventListener("click", function() {
      processor = null;
      show(setUp);
      hide(inGame);
      results.innerHTML = "";
      hide(results);
      inGameInput.value = "";
      hideError();
      hide(success);
    });
    //var userTry = document.getElementById("guess").addEventListener("onclick", this.guess);
  
    //document.getElementById("reset").addEventListener("onclick", reset);
    var won = function() {
      //hide(inGameFields);
      success.innerHTML =
        "<p><strong>Congratulations!</strong> You won in " +
        processor.getLastResult().turn +
        " turns.</p>";
      show(success);
    };
    var printResults = function(inReverse) {
      results.innerHTML = processor.getRounds(reverse.checked);
      show(results);
    };
  
    var showError = function(msg) {
      errors.innerHTML = msg;
      show(errors);
    };
    this.getProcessor = function() {
      return processor;
    };
    var hideError = function() {
      errors.innerHTML = "";
      hide(errors);
    };
    var show = function(e) {
      e.style.display = "block";
    };
    var hide = function(e) {
      e.style.display = "none";
    };
    var begin = function() {
      var input = setUpInput.value.trim();
      if (isNaN(input) || input > maxLength) {
        showError("Add a number please, of maximum length " + maxLength + ".");
        return;
      } else {
        processor = new Processor(input);
        hideError();
        hide(setUp);
        show(inGame);
        show(inGameFields);
        hidden.value = processor.getPcGuess();
      }
    };
    var setInput = function() {
      var l = inGameInput.value.trim();
      if (isNaN(l) || l.length != processor.getGuessLength()) {
        showError(
          "Add a number please, of maximum length " +
            processor.getGuessLength() +
            "."
        );
        return;
      } else {
        processor.setInput(inGameInput.value);
        hideError();
      }
      if (processor.getResult()) won();
      printResults();
    };
    // Add the listeners
    start.addEventListener("click", begin);
    document
      .getElementById("guessLength")
      .addEventListener("keypress", function(event) {
        if (event.keyCode == 13) {
          event.preventDefault();
          begin();
        }
      });
    guess.addEventListener("click", setInput);
    document
      .getElementById("userGuess")
      .addEventListener("keypress", function(event) {
        if (event.keyCode == 13) {
          event.preventDefault();
          setInput();
        }
      });
    reverse.addEventListener("click", printResults);
    hide(inGame);
  }
  
  // Cow Bulls internals
  function Processor(length) {
    // Required variables
    var pcGuess = [];
    var userGuess = [];
    var userValue;
    var guessLength = parseInt(length, 10);
    var round = [];
    // Result variables
    var cows = 0;
    var bulls = 0;
    var bullPosition = [];
    var won = false;
  
    for (var i = 0; i < guessLength; i++) {
      var exists = false;
      var guess;
      do {
        guess = Math.floor(Math.random() * 9 + 0);
        for (var e = 0; e < pcGuess.length; e++) {
          exists = pcGuess[e] == guess ? true : false;
          if (exists) break;
        }
      } while (exists);
      pcGuess[i] = guess;
    }
    this.getPcGuess = function() {
      return pcGuess;
    };
  
    this.getGuessLength = function() {
      return guessLength;
    };
  
    this.setInput = function(userInput) {
      for (var i = 0; i < guessLength; i++)
        userGuess[i] = parseInt(userInput[i], 10);
      userValue = parseInt(userInput, 10);
    };
    /**
     * Finds the result of user's input.
     * @returns {bool} true if user won, false otherwise
     */
    this.getResult = function() {
      //Store the round
      var index = round.length;
      round[index] = {};
      round[index].bulls = findBulls();
      round[index].cows = findCows();
      round[index].userInput = userValue;
      round[index].turn = index + 1;
      // Return the list of rounds
      return round[index].bulls === guessLength;
    };
    // Returns an order lists with all the user turns
    this.getRounds = function(reverse) {
      var result =
        "<table id='entries' class='table table-condensed'><tbody><tr><th>Turn</th><th>Input</th><th>Cows</th><th>Bulls</th></tr>";
      var input;
      // Show the table in the oposite direction.
      if (reverse) {
        for (var i = round.length - 1, min = 0; i >= min; i--) {
          result +=
            round[i].bulls === guessLength ? '<tr class="success">' : "<tr>";
          // If the user typed zero as a first number, pad it to the string otherwise it doesn't show.
          input =
            String(round[i].userInput).length === guessLength
              ? round[i].userInput
              : "0" + round[i].userInput;
          result += to_td(round[i].turn);
          result += to_td(input);
          result += to_td(round[i].cows);
          result += to_td(round[i].bulls);
          result += "</tr>";
        }
      } else {
        for (var j = 0, max = round.length; j < max; j++) {
          result +=
            round[j].bulls === guessLength ? '<tr class="success">' : "<tr>";
          // If the user typed zero as a first number, pad it to the string otherwise it doesn't show.
          input =
            String(round[j].userInput).length === guessLength
              ? round[j].userInput
              : "0" + round[j].userInput;
          result += to_td(round[j].turn);
          result += to_td(input);
          result += to_td(round[j].cows);
          result += to_td(round[j].bulls);
          result += "</tr>";
        }
      }
      result += "</tbody></table>";
      return result;
    };
  
    var to_td = function(data, attr) {
      data = data || "-";
      return "<td class='" + String(attr) + "'>" + String(data) + "</td>";
    };
  
    var findBulls = function() {
      var bullsFound = 0;
      for (var i = 0; i < guessLength; i++) {
        bullsFound += userGuess[i] === pcGuess[i] ? 1 : 0;
      }
      return bullsFound;
    };
  
    this.setPcGuess = function(number) {
      for (var i = 0; i < guessLength; i++) pcGuess[i] = parseInt(number[i], 10);
    };
  
    this.getLastResult = function() {
      return round[round.length - 1];
    };
  
    var findCows = function() {
      var cowsFound = 0;
      for (var i = 0; i < guessLength; i++) {
        for (var j = 0; j < guessLength; j++) {
          if (userGuess[i] === pcGuess[j] && i != j) {
            cowsFound += 1;
            break;
          }
        }
      }
      return cowsFound;
    };
  }
  
  /**
   * Broot forces the processor class and retrieves the number.
   */
  function BrootForcer(processor) {
    /** The processor class to broot force
     * Instead of stealing the table value, get the whole class
     *
     */
    var proc = processor;
    // Timers
    var date = new Date();
    var startTime;
    var endTime;
    var timeout;
    // Guess Results
    var results = {
      input: [],
      round: [],
      bulls: [],
      cows: []
    };
    var getRound = function() {
      proc.getLastResult();
    };
    var setRound = function(number) {
      proc.setInput(number);
    };
    var tryOnce = function(number) {
      proc.getResult();
    };
    this.findNoBull = function() {
      var found = false;
      do {
        var noBulls = Math.floor(Math.random() * 9 + 0);
        proc.setInput(String(noBulls));
        proc.getResult();
        if (proc.getLastResult().bulls === 0) {
          found = true;
        }
      } while (!found);
    };
    this.break = function() {};
  }