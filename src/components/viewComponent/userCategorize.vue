<template>
  <div>
    <TakoView
      v-if="user_type === 'TAKO'"
      :party_id="party_id"
      :title="title"
      :closing-date="closingDate"
      :nickname="nickname"
      :category="category"
      :activity-duration="activityDuration"
      :recruit-number="recruitNumber"
      :planned-start-date="plannedStartDate"
      :contact-mthod="contactMethod"
      :body="bodey"
      :activity_location="activity_location"
      :waiting_list="waiting_list"
      :accepted_list="accepted_list"
      :closed_date="closed_date"
    />
    <YakiView
      v-else-if="user_type === 'YAKI'"
      :party_id="party_id"
      :title="title"
      :closing-date="closingDate"
      :nickname="nickname"
      :category="category"
      :activity-duration="activityDuration"
      :recruit-number="recruitNumber"
      :planned-start-date="plannedStartDate"
      :contact-method="contactMethod"
      :body="body"
      :activity_location="activity_location"
      :closed_date="closed_date"
      :yaki_status="yaki_status"
    />
    <OtherView
      v-else-if="user_type =='OTHER'"
      :party_id="party_id"
      :title="title"
      :closing-date="closingDate"
      :nickname="nickname"
      :category="category"
      :activity-duration="activityDuration"
      :recruit-number="recruitNumber"
      :planned-start-date="plannedStartDate"
      :contact-method="contactMethod"
      :body="body"
      :activity_location="activity_location"
      :user_type="user_type"
      :closed_date="closed_date"
      :yaki_status="yaki_status"
    />
    <loginFalse
      v-else
      :title="title"
      :closing-date="closingDate"
      :nickname="nickname"
      :category="category"
      :activity-duration="activityDuration"
      :recruit-number="recruitNumber"
      :planned-start-date="plannedStartDate"
      :contact-method="contactMethod"
      :body="body"
      :activity_location="activity_location"
    />
  </div>
</template>

<script>
import TakoView from './TakoView.vue'
import YakiView from './YakiView.vue'
import OtherView from './OtherView.vue'
import loginFalse from './loginFalse.vue'

export default {
  
  components: {
    'TakoView': TakoView,
    'YakiView': YakiView,
    'OtherView': OtherView,
    'loginFalse': loginFalse,
  },
  props:['party_id'],

  data() {
    return{
      user_type:'',
      title: '',
      closingDate: '',
      category: '',
      area: '',
      competitionRate: '',
      nickname: '',
      activityDuration: '',
      recruitNumber: null,
      plannedStartDate: '',
      contactMethod: '',
      body: '',
      activity_location:'',
      waiting_list:[],
      accepted_list:[],
      closed_date:'',
      yaki_status:''
    }
  },

  created() {
    this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + 'parties/' + this.party_id)
      .then((response) => {
        console.log(response)
        this.user_type = response.data.data.user_type;
        this.title = response.data.data.title;
        this.closingDate = response.data.data.planned_closing_date;
        this.category = response.data.data.category;
        this.area = response.data.data.activity_location;
        this.competitionRate = response.data.data.competition_rate;
        this.nickname = response.data.data.nickname;
        this.activityDuration = response.data.data.activity_duration;
        this.recruitNumber = response.data.data.recruit_number;
        this.plannedStartDate = response.data.data.planned_start_date;
        this.contactMethod = response.data.data.contact_method;
        this.body = response.data.data.body;
        this.activity_location=response.data.data.activity_location;
        this.waiting_list=response.data.data.waiting_list;
        this.accepted_list=response.data.data.accepted_list;
        this.closed_date=response.data.data.closed_date;
        this.yaki_status=response.data.data.yaki_status;
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

</script>

<style>

</style>