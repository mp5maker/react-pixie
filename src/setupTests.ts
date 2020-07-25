import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { createSerializer } from 'enzyme-to-json'

/* Human Readable Format */
// @ts-ignore
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }))

/* Specific React Mention */
Enzyme.configure({ adapter: new Adapter() })