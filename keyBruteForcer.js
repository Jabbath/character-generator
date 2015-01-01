/*
Input: Nested array [[]]
Output: total number of elements from everything in the second layer of arrays
*/
function totalLen(arr){
	var len = 0;
	
	for(var i=0;i<arr.length;i++){
		len += arr[i].length;
	}
	
	return len;
}

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
	
	console.log('@ found: ', matches);
	
	/*
	Inputs: index of the current missing char,corresponding range
	Outputs: array of strings with the current char replaced with possible chars
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
	
	console.log('intermediate results: ', intermediates);
	var totalLength = totalLen(intermediates);
	var results = [];
	//now we have to combine the strings we've generated
	
	// We want a flat array of strings (results)
	var pos = reg.exec(intermediates[0][0]).index; //This is the position we will combine
		
	for(var i=0;i<intermediates[0].length;i++){//get the combinations of the first two and push to results
		for(var x=0;x<intermediates[1].length;x++){
			var str = intermediates[0][i];	
				
			results.push(str.substring(0,pos) + intermediates[1][x].substring(pos,pos+1) + str.substring(pos+1,str.length));
		}
	}
		
	intermediates.splice(0,2);//remove the first two
	
	while(intermediates.length !== 0){
		var holder = [];
		pos = reg.exec(results[0]).index;
		
		for(var i=0;i<results.length;i++){
			for(var x=0;x<intermediates[0].length;x++){
				holder.push(results[i].substring(0,pos) + intermediates[0][x].substring(pos,pos+1) + results[i].substring(pos+1,str.length));
			}
		}
		
		results = holder;
		intermediates.splice(0,1);
	}
	
	return results;
}

var lll = makeGuessList('A@-B@-c@',['0-9','0-9','0-9']);
console.log('results: ',lll);