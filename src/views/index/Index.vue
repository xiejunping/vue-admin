<template>
  <div class="hashboard">
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

    <Row :gutter="10">
      <Col span="4">
        <span>网络</span>
        <span>{{network}}</span>
      </Col>
      <Col span="18">
        <mixcheck v-model="network" @on-change="changeMix">
          <radio-item label="NONE">不限</radio-item>
          <check-item label="UNION">联通</check-item>
          <check-item label="MOBILE">移动</check-item>
          <check-item label="COMMET">电信</check-item>
        </mixcheck>
      </Col>
    </Row>
  </div>

</template>

<script>
import CountUp from '@/components/CountUp'
import Mixcheck from '@/components/mixcheck'
import CheckItem from '@/components/mixcheck/check-item'
import RadioItem from '@/components/mixcheck/radio-item'
export default {
  name: 'Index',
  components: {
    CheckItem,
    RadioItem,
    Mixcheck,
    CountUp
  },
  data () {
    return {
      countSize: '40px',
      countWeight: 700,
      count: {
        createUser: 253,
        wave: 5554,
        view: 385634,
        viewIP: 10987
      },
      network: ['UNION', 'MOBILE']
    }
  },
  methods: {
    changeMix (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="stylus" scoped>
.hashboard
  padding 15px
.info-card
  height 100px

.height-100
  height 100%

</style>
