ReachAlbert.constants = {
	mainTabs:[{
		id: 'home',
		name:'Home',
		icon: 'home',
		state: 'home',
		permission: 5
	},{
		id: 'profile',
		name:'My Profile',
		icon: 'account_box',
		state: 'profile',
		permission: 4
	},{
		id: 'console',
		name:'Console',
		icon: 'message',
		state: 'console',
		permission: 4
	},{
		id: 'admin',
		name:'Admin Console',
		icon: 'bubble_chart',
		state: 'admin',
		permission: 0
	},{
		id: 'teach',
		name:'Teach Albert',
		icon: 'school',
		state: 'teach',
		permission: 1
	},{
		id: 'blog',
		name:'Blog',
		icon: 'book',
		state: 'blog.home',
		permission: 5
	},{
		id: 'contact',
		name:'Get in Touch',
		icon: 'contacts',
		state: 'contact',
		permission: 5
	}],
	albert: {
		teach: {
			types: [{
				key: 'CONVO',
				name: 'Conversations'
			},{
				key: 'QN',
				name: 'Questions'
			},{
				key: 'CMD',
				name: 'Commands'
			}],
			actions: [{
				key: 'NONE',
				name: 'None',
				param_1: 'User\'s Query',
				param_2: 'Albert\'s Response'
			},{
				key: 'LINK',
				name: 'Link Responses',
				param_1: 'Parent Response',
				param_2: 'New Response'
			},{
				key: 'RM',
				name: 'Delete',
				param_1: 'Query',
				param_2: false
			},{
				key: 'CUSTOM',
				name: 'Custom Action',
				param_1: 'Param 1',
				param_2: 'Param 2'
			}]
		}
	}
}