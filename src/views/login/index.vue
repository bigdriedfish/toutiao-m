<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录" />
    <van-form ref="loginForm" @submit="onSubmit">
      <!-- 用户名 -->
      <van-cell-group>
        <van-field
          name="mobile"
          label="手机号"
          placeholder="请输入手机号"
          v-model="user.mobile"
          :rules="userFormRules.mobile"
          type="number"
          maxlength="11"
        >
          <i slot="left-icon" class="toutiao toutiao-shouji"></i>
        </van-field>
        <!-- 验证码 -->
        <van-field
          type="number"
          label="验证码"
          placeholder="请输入验证码"
          v-model="user.code"
          :rules="userFormRules.code"
          maxlength="6"
        >
          <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
          <template #button>
            <van-count-down
              v-if="isCountDownShow"
              :time="1000 * 5"
              format="ss s"
              @finish="isCountDownShow = false"
            />
            <van-button
              class="send-sms-btn"
              round
              native-type="button"
              size="small"
              type="default"
              @click="onSendSms"
              >发送验证码</van-button
            >
          </template>
        </van-field>
      </van-cell-group>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data() {
    return {
      isCountDownShow: false,
      user: {
        mobile: '15605665032',
        code: ''
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      // toast轻提示
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '登陆中...'
      })
      try {
        const res = await login(this.user)
        console.log('登录成功', res)
        this.$toast.success('登陆成功')
      } catch (err) {
        if (err.response.status === 400) {
          console.log('denglushibai', err)
          this.$toast.fail('登录失败，手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },
    async onSendSms() {
      // 1 验证表单手机号是否合规
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2 验证通过 展示倒计时
      this.isCountDownShow = true
      // 3 发送验证码
      try {
        await getSmsCode(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送频繁，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
