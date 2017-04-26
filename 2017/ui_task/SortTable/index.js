
function getKeys(keys){
  Array.prototype.forEach.call(sortTable.getElementsByTagName('span'),function(span){
      keys.push(span.getAttribute('title'));
    }
  );
}

// 渲染
function render(tableData, tbody, keys){
  tbody.innerHTML = '';
  var df = document.createDocumentFragment();
  tableData.forEach(function(obj){
    var tr = document.createElement('tr');
    keys.forEach(function(key, i){
      var td = document.createElement('td');
      td.innerHTML = obj[key];
      tr.appendChild(td);
    });
    df.appendChild(tr);
  });
  tbody.appendChild(df);
  setTimeout(function(){
    tbody.className = '';
  },1000);
}

// 排序
function sort(list, key, desc){
  return list.sort(function(a, b){
    return desc ? a[key] > b[key] : a[key] < b[key];
  })
}

// 读取表格数据，填充到对象中
function read(tbody, keys, tableData){
  Array.prototype.forEach.call(tbody.getElementsByTagName('tr'), function(tr) {
    var tds = tr.getElementsByTagName('td');
    var obj = {};
    keys.forEach(function(key, i){
      obj[key] = tds[i].innerHTML;
    });
    tableData.push(obj);
  }, this);
}

function find(sortTable, selectLabel){
  var sortKey, desc;
  Array.prototype.forEach.call(selectLabel.parentNode.childNodes, function(node){
    if(node.nodeName.toLowerCase() === 'span'){
      sortKey = node.getAttribute('title');
    }
  });
  desc = selectLabel.className === 'down' ? 0 : 1;
  return [sortKey, desc];
}

function toSort(sortTable, selectBtn){
  var tbody = sortTable.getElementsByTagName('tbody')[0];
  tbody.className = 'loading';
  var tableData = [];
  var keys = [];
  var sortinfo = find(sortTable, selectBtn);
  getKeys(keys);
  read(tbody, keys, tableData);
  sort(tableData, sortinfo[0], sortinfo[1]);
  render(tableData, tbody, keys);
}

// 执行
var sortTable = document.getElementById('sortTable');
sortTable.onclick = function(e){
  toSort(sortTable, e.target);
}

Array.prototype.forEach.call(document.getElementsByTagName('input'), function(radio){
  radio.onclick = function(e){
    e.stopPropagation();
  }
})