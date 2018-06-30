$(function(){
//	'use strict';
	
	var $form_add_task = $(".add-task"),
		$delete_task,
		task_list = [];
	
	init();
	
	$form_add_task.on("submit",function(e){
		var new_task = {};
		//禁用默认行为
		e.preventDefault();
		//获取新的Task值
		$input = $(this).find('input[name=content]');
		new_task.content = $input.val();
		//如果新Task的值为空，则直接返回，否则继续执行
		if(!new_task.content) return;
//		console.log('new_task',new_task);
		//存入新的Task值
		if(add_task(new_task)){
			//render_task_list();
			$input.val(null);
		}
	})
	/*
	 * 查找并监听所有删除按钮的点击事件
	 */
	function listen_task_delete(){
		$delete_task.on("click",function(){
		var $item = $(this).parent().parent();
		var index = $item.data("index");
		var tmp = confirm("确认删除?");
		tmp ? delete_task(index) : null;//与if语句类似
	})
	}
	
	
	function add_task(new_task){
		//将新Task值推入task_list
		task_list.push(new_task);
		//更新localStorage
		refresh_task_list();
		return true;
//		console.log("task_list",task_list);
	}
	/*
	 * refresh_task_list()刷新local storage数据并渲染模板
	 */
	function refresh_task_list(){
		store.set("task_list",task_list);
		render_task_list();//注意！
	}
	/*
	 * 删除一条task
	 */
	function delete_task(index){
		//如果没有index或者index不存在则直接返回
		if(index===undefined|| !task_list[index]) return;
		
		delete task_list[index];
		//更新local storage
		refresh_task_list();
	}
	
	function init(){
//		store.clear(); //清除数据
		task_list = store.get("task_list")||[];
		if(task_list.length){
			render_task_list();
		}
	}
	
	function render_task_list(){
		var $task_list = $('.task-list');
		$task_list.html("");
		for(var i=0;i<task_list.length;i++)
		{
			var $task = render_task_item(task_list[i],i);
			$task_list.append($task);
		}
		$delete_task = $(".action.delete");
		listen_task_delete();
	}
	
	function render_task_item(data, index){
		if(!data||!index) return;
		var list_item_tpl = 
					'<div class="task-item" data-index="'+index+'">'+
					'<span><input type="checkbox"></span>'+
					'<span class="task-content">'+data.content+'</span>'+
					'<span class="fr">'+
					'<span class="action delete"> 删除</span>'+
					'<span class="action detail"> 详情</span>'+
					'</span>'+
					'</div>';
				return $(list_item_tpl);
	}
})