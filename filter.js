//http://www.textfixer.com/tools/remove-line-breaks.php //For text formating by removing line breaks
//http://www.ourchangingglobe.com/misc/badwords-comma.txt //Source of bad words
//http://www.bannedwordlist.com/lists/swearWords.txt //Source of bad words


var fs = require('fs');
fs.readFile('./wordlist.txt',{encoding:'utf8'} ,function (err, data) {
	if (err) {
		console.log("File read error for wordlist.txt")
		throw err;
		return;
	}

	var wordList = "".replace.call(data,/(,?,\s+|\s+|,)|(,?,\n|\n)/g," ");
	console.log("File read complete for wordlist.txt");

	fs.readFile('./badwords.txt',{encoding:'utf8'} ,function (err, data) {
		if (err) {
			console.log("File read error for badwords.txt")
			throw err;
			return;
		}
		

		var badWordList = "".replace.call(data,/\/\*[^\*/]*\*\//g," ");
		badWordList = "".replace.call(badWordList,/(,?,\s+|\s+|,)|(,?,\n|\n)/g," ");
		console.log("File read complete for badwords.txt");

	  	wordList = wordList.split(/\s+/);
		badWordList = badWordList.split(/\s/);

		var badWordObj = {};
		badWordList.forEach(function(word){
			badWordObj[word] = 1;
		})



		var corectedList = [], removedList = [];
		wordList.forEach(function(word) {
			if(badWordObj[word]) {
				removedList.push(word);
			} else {
				corectedList.push(word+"        ".slice(word.length));
			}

		});

		fs.writeFile("./corectedwords.txt", corectedList.join("\n"), function(err) {
		    if(err) {
		        console.log(err);
		    } else {
		        console.log("The corected file is saved!");
		    }
		}); 

		fs.writeFile("./removedwords.txt", removedList.join("\n"), function(err) {
		    if(err) {
		        console.log(err);
		    } else {
		        console.log("The removed file is saved!");
		    }
		});
	});
});







