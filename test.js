var a = [6,6,6,6,6,6];
var d = [{name: 'john',
		selections: [5,5,5,5,5,5]
		},{name: 'rob',
		selections: [6,6,5,6,6,6]
	    },{name: 'bill',
	    selections: [6,6,6,6,6,6]
		},{name: 'jack',
		selections: [6,6,6,6,6,6]
		},{name: 'jay',
		selections: [1,1,1,1,1,1],
		},{name: 'joe',
		selections: [2,2,2,2,2,2]
		},{name: 'rick',
		selections: [3,3,3,3,3,3]}]

function indexOfSmallest(a){
	var lowest = 0;
	for (var i = 1; i < a.length; i++){
		if(a[i] < a[lowest]) lowest = i;
	}
	return lowest;
}

function MatchMaker(){
	this.c = [];
	this.f = [];
	this.count = 0;
	this.sum = 0;
	this.index = function(){
		if (this.c.length < d.length){
			for (var i = 0; i < a.length; i++){
			 	this.sum += ((a[i] - d[this.count].selections[i])*-1);
		}
		this.c.push(this.sum);
		this.f.push(d[this.count].name)
		this.sum = 0;
		this.count++;
		this.index();
		} else {
			for(var j = 0; j < this.c.length; j++) {
				if (this.c[j] < 0){
				this.c[j] = this.c[j]*-1;
				}
			}
			if (this.c.length === 1) {
				alert("You are officially the first member. Your match will come");
				} else {
				console.log(this.f[indexOfSmallest(this.c)]);
			}
		}
	}
}
var newMatch = new MatchMaker();
newMatch.index();

// module.exports['match'] = newMatch;

