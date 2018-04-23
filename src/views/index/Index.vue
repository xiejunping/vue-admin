<template>
  <Row :gutter="10">
    <Col span="6">
      <Card :padding="0">
        <div class="info-card">
          <Col span="8" class="height-100" :style="{backgroundColor: 'blue', color: 'white', fontSize: '22px'}">
          <Row type="flex" class="height-100" align="middle" justify="center">
            <span>abc</span>
          </Row>
          </Col>
          <Col span="16" class="height-100">
            <Row type="flex" class="height-100" align="middle" justify="center">
              <count-up id-name="user_create_count"
                        :end-val="count.createUser"
                        color="#ff0000"
                        :count-size="countSize"
                        :count-weight="countWeight">
                <p slot="intro">今日新增</p>
              </count-up>
            </Row>
          </Col>
        </div>
      </Card>
    </Col>
    <Col span="6">
      <Card :padding="0">
        <div class="info-card">
          <Col span="8" class="height-100" :style="{backgroundColor: 'blue', color: 'white', fontSize: '22px'}">
            <Row type="flex" class="height-100" align="middle" justify="center">
              <span>abc</span>
            </Row>
          </Col>
          <Col span="16" class="height-100">
            <Row type="flex" class="height-100" align="middle" justify="center">
              <count-up id-name="user_wave"
                        :end-val="count.wave"
                        color="#ff0000"
                        :count-size="countSize"
                        :count-weight="countWeight">
                <p slot="intro">今日活跃</p>
              </count-up>
            </Row>
          </Col>
        </div>
      </Card>
    </Col>
    <Col span="6">
      <Card :padding="0">
        <div class="info-card">
          <Col span="8" class="height-100" :style="{backgroundColor: 'blue', color: 'white', fontSize: '22px'}">
          <Row type="flex" class="height-100" align="middle" justify="center">
            <span>abc</span>
          </Row>
          </Col>
          <Col span="16" class="height-100">
          <Row type="flex" class="height-100" align="middle" justify="center">
            <count-up id-name="user_view"
                      :end-val="count.view"
                      color="#ff0000"
                      :count-size="countSize"
                      :count-weight="countWeight">
              <p slot="intro">今日访客</p>
            </count-up>
          </Row>
          </Col>
        </div>
      </Card>
    </Col>
    <Col span="6">
      <Card :padding="0">
        <div class="info-card">
          <Col span="8" class="height-100" :style="{backgroundColor: 'blue', color: 'white', fontSize: '22px'}">
          <Row type="flex" class="height-100" align="middle" justify="center">
            <span>abc</span>
          </Row>
          </Col>
          <Col span="16" class="height-100">
          <Row type="flex" class="height-100" align="middle" justify="center">
            <count-up id-name="user_view_ip"
                      :end-val="count.viewIP"
                      color="#ff0000"
                      :count-size="countSize"
                      :count-weight="countWeight">
              <p slot="intro">今日IP</p>
            </count-up>
          </Row>
          </Col>
        </div>
      </Card>
    </Col>
  </Row>
</template>

<script>
import CountUp from '@/components/CountUp'
export default {
  name: 'Index',
  data () {
    return {
      countSize: '40px',
      countWeight: 700,
      count: {
        createUser: 253,
        wave: 5554,
        view: 385634,
        viewIP: 10987
      }
    }
  },
  components: {CountUp}
}
</script>

<style scoped>
.info-card {
  height: 100px;
}
.height-100 {
  height: 100%;
}
</style>
