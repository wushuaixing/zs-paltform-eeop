<template>
  <div class="workbench-wrapper">
    <div class="workbench-item workbench-left">
      <div class="item-wrapper item-border">
        <div class="item-title item-format ">服务商注册情况</div>
        <div class="item-content item-format">
          <span class="total">累计注册服务商 {{echarts.myProjectsNum}} 名</span>
          <span class="total">昨日新增注册 {{echarts.myProjectsNum}} 名</span>
          <div class="data-display">
            <!-- 饼图显示 -->
            <div class="chart">
              <div id="main"></div>
            </div>
            <div class="schemeProcess">
              <a-badge color="#c23531" text="仅注册" />
              <span style="margin-left: 45px">{{echarts.myProjectCaseUnSubmit}}</span>
              <br />
              <a-badge text="已认证资质" color="#2f4554"/>
              <span style="margin-left: 18px">{{echarts.myProjectCaseSubmitted}}</span>
              <br />
              <a-badge text="已提交要素表" color="#61a0a8" />
              <span style="margin-left: 4px">{{echarts.myProjectsReview}}</span>
              <br />
              <a-badge text="已入库" color="#d48265"/>
              <span style="margin-left: 45px">{{echarts.myProjectsAimed}}</span>
              <br />
              <a-badge text="审核未通过" color="#91c7ae"/>
              <span style="margin-left: 18px">{{echarts.myProjectsInvalid}}</span>
              <br />
            </div>
          </div>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="item-project item-format">项目招商情况</div>
        <!-- 未添加项目 -->
        <!-- <div class="empty" v-if="false">
          <a-empty description>
            <slot name="description">您还没有已开始的项目，去<router-link to="/center">服务商项目招商中心</router-link>添加第一个项目</slot>
          </a-empty>
        </div> -->
        <!-- <div class="item-content item-format" >
          <div class="total">我的项目总数：{{echarts.myProjectsNum}}</div> -->
          <!-- <div class="data-display">
          </div> -->
        <!-- </div> -->
      </div> 
    </div>
    <div class="workbench-item workbench-right">
      <div class="item-wrapper">
        <div class="item-title item-format"></div>
          <!-- <ul class="through">
            <li  v-for="(item, index) in list" :key="index">
              <a-badge :status="MATTER_TYPE[item.code].text" />
              <span class="thing">{{ MATTER_TYPE[item.code].name}}</span>
              <span class="message">{{item.message}}</span>
                <a-button type="link" @click="onTarget(MATTER_TYPE[item.code].path, item.projectId)" >立即前往</a-button>
            </li>
          </ul> -->
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import { getEchartsInvestMennt } from "@/plugin/api/echarts";
import { getTODoList } from "@/plugin/api/calendar";
import { MATTER_TYPE } from "./toDoList";
import echarts from "echarts";
export default {
  name: "Workbench",
  nameComment: "工作台",
  components: {
  },
  data() {
    return {
      // 后台图表的数据
      echarts: {},
      // 待办事项的数据
      list: [],
      // 提醒类型
      MATTER_TYPE,
    };
  },
  computed: {
    isShowEcharts(){
      for (let key in this.echarts){
        return this.echarts[key] !== 0 ? false : true;
      }
    }
  },
  methods: {
    // 待办事项
    async getList() {
      const res = await getTODoList();
      console.log(res);
      if (res.code !== 20000) return 
        this.list = res.data
    },
    //echarts饼图项目招商
    async initECharts () {
      let myChart = echarts.init(document.getElementById("main"));
      const res = await getEchartsInvestMennt();
      if (res.code !== 20000) return this.$message.error('获取图表数据失败');
      console.log(res);
      this.echarts = res.data;
      let option = {
      // color: ['red', 'blue','green','skyblue','pink'],
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            // avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center',
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '14',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: this.echarts.myProjectCaseUnSubmit, name: '方案待提交'},
              { value: this.echarts.myProjectCaseSubmitted, name: '方案已提交'},
              { value: this.echarts.myProjectsReview, name:'方案审批中'},
              { value: this.echarts.myProjectsAimed, name: '中标'},
              { value: this.echarts.myProjectsInvalid, name: '失效'},
              { value: this.echarts.myProjectAbandon, name:'放弃'},
            ]
          }
        ]
      }
    // myChart.setOption(option,{
    //   notMerge: false,
    //   lazyUpdate: false,
    //   silent: false
    // });
     myChart.setOption(option,true);
    },
    // 根据详情路由跳转
    onTarget (path,id) {
      this.$router.push({path,query:id})
    }
  },
  created () {
    // this.getCalendarData()
    this.getList()
  },
  mounted() {
    this.initECharts()
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
$leftWidth: 550px;
.workbench-wrapper {
  height: 100%;
  padding: 16px;
  a {
      text-decoration: none!important;
      color: #0A91B4!important;
    }
  .workbench {
    &-item {
      height: 100%;
      background-color: #ffffff;
    }
    &-left {
      float: left;
      width: $leftWidth;
      border-right: 10px solid $background-base;
    }
    &-right {
      margin-left: $leftWidth;
    }
  }
  .item {
    &-format {
      padding: 10px;
      font-size: 14px;
      line-height: 1;
      border-bottom: 1px solid #E9E9E9;
    }
    &-border {
      border-bottom: 10px solid $background-base;
    }
    &-title {
      padding: 20px 24px;
      border-bottom: 1px solid #E9E9E9;
      line-height: 1.5;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #262626;
    }
    &-project {
      padding: 20px 24px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #333333;
      line-height: 16px;
    }
    &-content {
      min-height: 280px;
    }
    &-thing {
      min-height: 432px;
    }

  }
    ul {
      margin: 0;
      padding: 0;
    }
    .through {
      li {
        list-style: none;
        border-bottom: 1px solid #E9E9E9;
        margin-left: 20px;
        padding: 10px 0;
      }
    }
    .data-display {
      display: flex;
      justify-content: space-around;
      // align-items: center;
      width: 100%;
      height: 262px;
      margin-top: 20px;
      .ant-badge {
        margin: 10px 10px;
      }
    }
    .chart {
      position: relative;
      width: 250px;
      height: 250px;
      border-radius: 50%;
    }
    .schemeProcess,.schemeStatus {
      width: 30%;
      span {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 20px;
      }
    }
    .total {
      font-size: 16px;
      padding: 0 20px;
      // margin-top: 20px;
      margin-left: 10px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #333333;
      line-height: 16px;
    }
  }
  span {
    font-weight: 400;
    font-size: 16px;
    padding: 3px 0;
  }
  .message {
    font-size: 14px;
    height: 20px;
    line-height: 20px;
  }
  #main{
    position: absolute;
    top: -10px;
    left: 10px;
    width: 250px;
    height: 250px;
  }
  /deep/.ant-btn {
    padding: unset;
    height: 20px;
    line-height: 20px;
  }
</style>
