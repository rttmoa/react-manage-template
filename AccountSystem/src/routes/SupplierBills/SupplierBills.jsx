import React, { Component, PropTypes } from "react";
import { connect } from "dva";
// import SearchBar from '../../components/SearchBar/SearchBar';
import SupplierBillsSearchForm from "../../components/SupplierBills/SupplierBillsSearchForm/SupplierBillsSearchForm";
import DebtStorageList from "../../components/SupplierBills/DebtStorageList/DebtStorageList";
import SupplierBillsList from "../../components/SupplierBills/SupplierBillsList/SupplierBillsList";
import ClearDebtStorageModal from "../../components/SupplierBills/ClearDebtStorageModal/ClearDebtStorageModal";
import ClearSupplierBillsModal from "../../components/SupplierBills/ClearSupplierBillsModal/ClearSupplierBillsModal";
// import {routerRedux} from 'dva/router';
import BreadcrumbList from "../../components/BreadcrumbList/BreadcrumbList";
import { redirect } from "../../utils/webSessionUtils";
import { search, supplierBillsClass, debtStorageListContainer, supplierBillsListContainer } from "./index.css";




function genSupplierBills({ dispatch, supplierBillsSpace }) {
    const {
        total,
        loading,
        current,
        breadcrumbItems,
        storage,
        suppliers,
        supplierBills,
        visible,
        editorType,
        currentItem,
        supplierId,
    } = supplierBillsSpace;

    const debtStorageListProps = {
        current,
        total,
        dataSource: storage,
        loading,
        onClearStorage(order) { // FIXME: 负债入库单 ? 清单
            dispatch({
                type: "supplierBillsSpace/clearStorage",
                payload: {
                    order,
                },
            });
        },
        onPageChange(page) {
            dispatch({
                type: "supplierBillsSpace/query",
                payload: { supplierId, page },
            });
        },
    };

    const supplierBillsListProps = {
        dataSource: supplierBills,
        loading,
        onClearBill(bill) { // FIXME: 负债供应商 ? 清账
            dispatch({
                type: "supplierBillsSpace/clearBill",
                payload: {
                    bill,
                },
            });
        },
    };

    const onSearch = (fieldValues) => {
        dispatch({
            type: "supplierBillsSpace/query",
            payload: { ...fieldValues, page: 1 },
        });
    };

    const clearModalProps = {
        visible,
        currentItem,
        onConfirm(values) {
            // console.log(values) // // {storageId: '642f7bc70f672825c06161cc', paymentAmount: 444}
            dispatch({
                type: `supplierBillsSpace/${
                    editorType === "clearStorage" ? "doClearStorage" : "doClearBill"
                }`,
                payload: {...values},
            });
        },
        onCancel() {
            dispatch({
                type: "supplierBillsSpace/hideEditor",
            });
        },
    };

    // FIXME: 清单弹窗操作
    const ClearDebtStorageModalGen = () => (
        <ClearDebtStorageModal {...clearModalProps} />
    );

    // FIXME: 清账弹窗操作
    const ClearSupplierBillsModalGen = () => (
        <ClearSupplierBillsModal {...clearModalProps} />
    );




    // console.log("供应商下拉", suppliers)
    // console.log("负债入库单列表", storage)
    // console.log("负债供应商列表", supplierBills)
    return (
        <div className={supplierBillsClass}>

            {/* 面包屑 */}
            <BreadcrumbList breadcrumbItems={breadcrumbItems} />

            {/* 搜索 */}
            <div className={search}>
                <SupplierBillsSearchForm
                    onSearch={onSearch}
                    suppliers={suppliers}
                />
            </div>

            {/* 负债入库单列表 */}
            <div className={debtStorageListContainer}>
                {/* ===========================功能================================================= */}
                <h3>清单 / 清账 弹出框</h3>
                <DebtStorageList {...debtStorageListProps} />
            </div>

            {/* 负债供应商列表 */}
            <div className={supplierBillsListContainer}>
                <SupplierBillsList {...supplierBillsListProps} />
            </div>

            {/* 清单 / 清账的弹出框 */}
            {editorType === "clearStorage" ? (
                <ClearDebtStorageModalGen />
            ) : (
                <ClearSupplierBillsModalGen />
            )}
        </div>
    );
}
class SupplierBills extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        let { isLogin } = this.props.systemUser;
        return !isLogin && redirect();
    }
    render() {
        let { isLogin } = this.props.systemUser;
        return isLogin && genSupplierBills(this.props);
    }
}
SupplierBills.propTypes = {
    storage: PropTypes.object,
};
function mapStateToProps({ supplierBillsSpace, systemUser }) {
    return { supplierBillsSpace, systemUser };
}
export default connect(mapStateToProps, null)(SupplierBills);
