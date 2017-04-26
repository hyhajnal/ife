// 封装

var SortTable = function(id){
  if(!this instanceof SortTable){
    return new SortTable(id);
  }
  this.table = document.getElementById(id);
  this.tbody = this.table.getElementsByTagName('tbody')[0];
  this.tableData = [];
  this.keys = [];
  this.sortinfo = {};
}

SortTable.prototype = {

  getKeys: function(){
    Array.prototype.forEach.call(this.table.getElementsByTagName('span'),function(span){
        this.keys.push(span.getAttribute('title'));
      }.bind(this)
    );
  },

  render: function(){
    this.tbody.innerHTML = '';
    var df = document.createDocumentFragment();
    this.tableData.forEach(function(obj){
      var tr = document.createElement('tr');
      this.keys.forEach(function(key, i){
        var td = document.createElement('td');
        td.innerHTML = obj[key];
        tr.appendChild(td);
      });
      df.appendChild(tr);
    }.bind(this));
    this.tbody.appendChild(df);
    setTimeout(function(){
      this.tbody.className = '';
    }.bind(this),1000);
  },

  sort: function(key, desc){
    return this.tableData.sort(function(a, b){
      return desc ? a[key] > b[key] : a[key] < b[key];
    })
  },

  read: function(){
    var _this = this;
    Array.prototype.forEach.call(_this.tbody.getElementsByTagName('tr'), function(tr) {
      var tds = tr.getElementsByTagName('td');
      var obj = {};
      _this.keys.forEach(function(key, i){
        obj[key] = tds[i].innerHTML;
      });
      _this.tableData.push(obj);
    });
  },

  find: function(selectLabel){
    var sortKey, desc;
    Array.prototype.forEach.call(selectLabel.parentNode.childNodes, function(node){
      if(node.nodeName.toLowerCase() === 'span'){
        sortKey = node.getAttribute('title');
      }
    });
    desc = selectLabel.className === 'down' ? 0 : 1;
    return [sortKey, desc];
  },

  toSort: function(selectLabel){
    this.tbody.className = 'loading';
    var sortinfo = this.find(selectLabel);
    this.getKeys();
    this.read();
    this.sort(sortinfo[0], sortinfo[1]);
    this.render();
  },

  init: function(){
    this.keys = [];
    this.tableData = [];
    this.keys = [];
    this.sortinfo = {};
  },

  do: function(){
    this.table.onclick = function(e){
      this.init();
      this.toSort(e.target);
    }.bind(this);

    Array.prototype.forEach.call(this.table.getElementsByTagName('input'), function(radio){
      radio.onclick = function(e){
        e.stopPropagation();
      }
    });
  }


}