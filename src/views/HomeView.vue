<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4 sidebar">
        <LeftSidebar />
      </div>

      <div class="col-md-8 messages">
        <MessageList />
      </div>

      <ChannelModal />
    </div>
  </div>
</template>

<script setup>
import ChannelModal from '@/components/modals/ChannelModal.vue'
import MessageList from '@/components/messages/MessageList.vue'
import LeftSidebar from '@/components/sidebar/LeftSidebar.vue'
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
