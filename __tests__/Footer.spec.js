import { mount } from 'vue-test-utils'
import Footer from '../src/components/Footer'

/*
 *  Using `mount` clears the error:
 * [Vue warn]: Do not use built-in or reserved HTML elements as component id: data
 */
const factory = (values = {}) => mount(Footer, { data: { ...values  } })

describe('Footer', () => {
  it("renders creator's text", () => {
    const wrapper = factory()

    expect(wrapper.find('#creator').text()).toEqual('Made with fas fa-heart by codejockie')
  })

  it('renders copyright', () => {
    const wrapper = factory()

    expect(wrapper.find('#copyright').exists()).toBeTruthy()
    expect(wrapper.find('#copyright').text()).toEqual(`© ${new Date().getFullYear()}`)
  })
})