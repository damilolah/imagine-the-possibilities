import Vue from 'vue'
import Profile from '@/components/Profile'

describe('Profile.vue', () => {
  it('should create', () => {
    const profileComponent = Vue.extend(Profile)
    expect(profileComponent).toBeTruthy()
  })
})
