import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { CNavItem, CNavTitle, CSidebar, CSidebarNav } from "@coreui/react";
import '../styles/admin.css'

const Sidebar = () => {
    return (
        <CSidebar unfoldable className=" sidebar vh-100">
            <CSidebarNav>
                <CNavItem className=' text-center d-flex'>
                    <i class="bi bi-list m-2"></i>
                    <h5 className='mx-5 my-1 fw-bolder'>TETHERX</h5>
                </CNavItem>
                <CNavTitle>
                    CRM APP
                </CNavTitle>
                <CNavItem className='d-flex'>
                    <i class="bi bi-box-arrow-left m-2"></i>
                    <div className='max-5 my-1 mx-5'>Logout</div>
                </CNavItem>
            </CSidebarNav>
        </CSidebar>
    )
}

export default Sidebar;