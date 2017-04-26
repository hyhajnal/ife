## UI 之排序表格
### 在线 demo
[demo](https://hyhajnal.github.io/ife/2017/ui_task/SortTable/index.html "ui_sort_table") 
### 排序按钮切换样式
通过 radio label 标签， 然后用 .radio:checked + .up 纯 css 控制单选效果。
``` css
.triangle {
  width: 0;
  height: 0;
  border-width: 7px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}
```

### 事件绑定
table 监听 click 事件，但由于 radio 这些标签本身就绑定了 click 事件，所以需要阻止冒泡。

### 类数组的 call apply 处理
``` js
Array.prototype.forEach.call(
  this.table.getElementsByTagName('span'),
  function(span){
    this.keys.push(span.getAttribute('title'));
  }.bind(this)
);
```
### Array.sort 根据分数排序

``` js
sort: function(key, desc){
    return this.tableData.sort(function(a, b){
      return desc ? a[key] > b[key] : a[key] < b[key];
    })
  },
```
