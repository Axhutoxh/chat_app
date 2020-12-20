<template>
  <q-page 
  	ref="pageChat"
  	class="page-chat flex column">
  	<q-banner 
  		v-if="!otherUserDetails.online"
  		class="bg-grey-4 text-center fixed-top">
      {{ otherUserDetails.name }} is offline.
    </q-banner>
  	<div 
  		:class="{ 'invisible' : !showMessages }"
  		class="q-pa-md column col justify-end">
  		<q-chat-message
  			v-for="(message, key) in messages"
  			:key="key"
  		  :name="message.from == 'me' ? userDetails.name : otherUserDetails.name"
  		  :text="[message.text]"
  		  :sent="message.from == 'me' ? true : false"
  		  :bg-color="message.from == 'me' ? 'white' : 'light-green-2'"
  		/>
  	</div>
  	<q-footer elevated>
  	  <q-toolbar>
  	  	<q-form 
  	  		@key.enter="sendMessage"
  	  		class="full-width">
	  	    <q-input
	  	    	v-model="newMessage"
	  	    	ref="newMessage"
	  	    	bg-color="white"
	  	    	outlined
	  	    	rounded
	  	    	label="Message"
	  	    	dense>

	  	      <template v-slot:after>
	  	        <q-btn
				  	@click="sendMessage"
	  	        	round
	  	        	dense
	  	        	flat
	  	        	type="click"
	  	        	color="white"
	  	        	icon="send" />
	  	      </template>
	  	    </q-input>
  	  	</q-form>
  	  </q-toolbar>
  	</q-footer>
  </q-page>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import mixinOtherUserDetails from 'src/mixins/mixin-other-user-details.js'

	export default {
		mixins: [mixinOtherUserDetails],
	  data() {
	  	return {
	  		newMessage: '',
	  		showMessages: false
	  	}
	  },
	  computed: {
	  	...mapState('store', ['messages', 'userDetails'])
	  },
	  methods: {
	  	...mapActions('store', ['firebaseGetMessages', 'firebaseStopGettingMessages', 'firebaseSendMessage']),
	  	sendMessage() {
	  		this.firebaseSendMessage({
	  			message: {
		  			text: this.newMessage,
		  			from: 'me'
	  			},
	  			otherUserId: this.$route.params.otherUserId
	  		})
	  		this.clearMessage()
	  	},
	  	clearMessage() {
	  		this.newMessage = ''
	  		this.$refs.newMessage.focus()
	  	},
	  	scrollToBottom() {
	  		let pageChat = this.$refs.pageChat.$el
	  		setTimeout(() => {
		  		window.scrollTo(0, pageChat.scrollHeight)
	  		}, 20);
	  	}
	  },
	  watch: {
	  	messages: function(val) {
	  		if (Object.keys(val).length) {
	  			this.scrollToBottom()
	  			setTimeout(() => {
	  				this.showMessages = true
	  			}, 200)
	  		}
	  	}
	  },
	  mounted() {
	  	this.firebaseGetMessages(this.$route.params.otherUserId)
	  },
	  destroyed() {
	  	this.firebaseStopGettingMessages()
	  }
	}
</script>

<style lang="stylus">
	.page-chat
		background #e2dfd5
		&:after
			content ''
			display block
			position fixed
			left 0
			right 0
			top 0
			bottom 0
			z-index 0
			opacity 0.1
			background-image:radial-gradient(closest-side, transparent 0%, transparent 75%, #B6CC66 76%, #B6CC66 85%, #EDFFDB 86%, #EDFFDB 94%, #FFFFFF 95%, #FFFFFF 103%, #D9E6A7 104%, #D9E6A7 112%, #798B3C 113%, #798B3C 121%, #FFFFFF 122%, #FFFFFF 130%, #E0EAD7 131%, #E0EAD7 140%) 
			radial-gradient(closest-side, transparent 0%, transparent 75%, #B6CC66 76%, #B6CC66 85%, #EDFFDB 86%, #EDFFDB 94%, #FFFFFF 95%, #FFFFFF 103%, #D9E6A7 104%, #D9E6A7 112%, #798B3C 113%, #798B3C 121%, #FFFFFF 122%, #FFFFFF 130%, #E0EAD7 131%, #E0EAD7 140%)
			background-size: 110px 110px
			background-color: #C8D3A7
			background-position: 0 0, 55px 55px
	.q-banner
		top 50px
		z-index 2
		opacity 0.8
	.q-message
		z-index 1
</style>
