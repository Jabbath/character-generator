/*
partial will be a string with missing chars represented with '@'

ranges take the form of 'A-Z','a-z' or '0-9' and there must be one present for
each missing character
*/
function makeGuessList(partial,ranges){
	var missing = partial.split('@').length - 1; //So we know how many chars are missing
	
	if((ranges.length) !== missing){ 
		throw new Error('Not enougth ranges provided');
	}
	
	var reg = /@/g;
	var match = reg.exec(partial); //This will be a regex match for the '@'
	var matches = []; //All found matches will be stored here
	var intermediates = [];
	
	while(match !== null){//This makes sure we match all the @'s
		matches.push(match);
		match = reg.exec(partial);
	}
	
	//console.log('@ found: ', matches);
	
	/*
	Inputs: index of the current missing char,corresponding range
	Outputs: array of strings, with the current char replaced with possible chars
	*/
	function possibles(index,currentRange){
		var start = currentRange[0].charCodeAt(0);//Starting char
		var end = currentRange[1].charCodeAt(0);//Ending char
		var strArr = [];
		
		for(var i=start;i<=end;i++){
			var newStr = partial.substring(0,index) + String.fromCharCode(i) + partial.substring(index+1,partial.length);//This is the partial with a char replaced
			strArr.push(newStr);
		}
		
		return strArr;
	}
	
	for(var i=0;i<matches.length;i++){
		var index = matches[i].index;
		var currentRange = ranges[i].split('-'); //[A,Z]
		
		intermediates.push(possibles(index,currentRange));
	}
	
	//console.log('intermediate results: ', intermediates);
	
	// We want a flat array of strings (results) so we combine 0 w 1 and make that the new 0, then combine that with the new one
	//and repeat until we only have one item
	while(intermediates.length !== 1){
		var pos = reg.exec(intermediates[0][0]).index; //This is the position we will combine
		var holder = []; //This will temp. hold combined strings
		
		for(var i=0;i<intermediates[0].length;i++){//get the combinations of the first two and push to our temp holder
			for(var x=0;x<intermediates[1].length;x++){
				var str = intermediates[0][i];	
				
				holder.push(str.substring(0,pos) + intermediates[1][x].substring(pos,pos+1) + str.substring(pos+1,str.length));
			}
		}
	
		intermediates[0] = holder;
		intermediates.splice(1,1);//remove the item we just combined
	
	}

	
	return intermediates[0];
}

module.exports = makeGuessList;