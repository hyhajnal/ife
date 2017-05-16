

	var Modal = function(options){
		if(!(this instanceof Modal)){
			return new Modal()
		}
		this.defaults = {
			overlay: true,
			closeButton: true,
			foot: false,
			content: 'ahahaa',
		}
		this.options = options ? options : this.defaults
		this.modal = null
		this.overlay = null
	}

	Modal.prototype = {
		open: function(){
			//进制滚动
			document.body.className = 'noscroll'

			documentFragment = document.createDocumentFragment()

			this.modal = document.createElement('div')
			this.modal.className = 'modal fadeInDown' 

			if(this.options.closeButton){
				var closeButton = document.createElement('div')
					closeButton.className = 'close-btn'
					closeButton.innerHTML = 'x'
					closeButton.addEventListener('click', this.close.bind(this), false)
					this.modal.appendChild(closeButton)
			}

			if(this.options.overlay){
				this.overlay = document.createElement('div')
				this.overlay.className = 'overlay'
				this.overlay.addEventListener('click', this.close.bind(this), false)
				documentFragment.appendChild(this.overlay)
			}

			if(this.options.title){
				var title = document.createElement('h1')
					title.className = 'modal.title'
					title.innerHTML = this.options.title
					this.modal.appendChild(title)
			}

			var modalBody = document.createElement('div')
				modalBody.className = 'modal-body'
				modalBody.innerHTML = this.options.content
				this.modal.appendChild(modalBody)

			if(this.options.foot){
				var foot = document.createElement('div')
					foot.className = 'modal-foot'
				var confirm = document.createElement('button')
					confirm.className = 'trigger-button'
					confirm.innerHTML = '确定'
					confirm.addEventListener('click', function(){
						if(this.options.cb){
							this.options.cb('你点击了确定')
						}
						this.close()
					}.bind(this), false)
				var cancle = document.createElement('button')
					cancle.className = 'trigger-button'
					cancle.innerHTML = '取消'
					cancle.addEventListener('click', function(){
						if(this.options.cb){
							this.options.cb('你点击了取消')
						}
						this.close()
					}.bind(this), false)
				foot.appendChild(confirm)
				foot.appendChild(cancle)
				this.modal.appendChild(foot)

			}
			documentFragment.appendChild(this.modal)
			document.body.appendChild(documentFragment)


		},

		close: function(){
			document.body.className = ''
			this.modal.className  = 'modal fadeOutUp'
			setTimeout(function(){
				document.body.removeChild(this.modal)
				if(this.overlay){
					document.body.removeChild(this.overlay)
				}
			}.bind(this), 500)
		}
	}
