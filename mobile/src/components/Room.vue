<template>
  <div class="room">
    <p>房间名：LzBBKmt9z_df1FgbAAAh</p>
    <p>玩家人数：4</p>
    <p>房间类型：无限制</p>
    <p>房间状态：等待中</p>
  </div>
</template>

<style scoped>
  .room {
    margin: 8px 0;
    height: 90px;
    padding: 5px 10px;
    box-shadow: 0 0 3px green;
  }

  .room.busy {
    box-shadow: 0 0 3px red;
  }

  p {
    line-height: 20px;
  }
</style>
