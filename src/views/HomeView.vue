<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4 sidebar">
          <sidebar></sidebar>
        </div>

        <div class="col-md-8 messages">
          <messages></messages>
        </div>

        <channel-modal></channel-modal>
      </div>
    </div>
  </div>
</template>

<script>
import ChannelModal from '@/components/modals/ChannelModal'
import Messages from '@/components/messages/Messages'
import Sidebar from '@/components/sidebar/Sidebar'

export default {
  name: 'HomeView',
  components: {
    'channel-modal': ChannelModal,
    messages: Messages,
    sidebar: Sidebar
  }
}
</script>

<style scoped>
.sidebar {
  width: 33%;
  display: block;
  float: left;
  position: fixed;
  height: 100%;
  background: #000;
  padding-top: 2em;
  overflow: scroll;
}
.messages {
  width: 66%;
  display: block;
  float: left;
  margin-left: 33%;
}
</style>
