import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import * as Tabs from "@radix-ui/react-tabs";
import AccountForm from "@/components/AccountForm/AccountForm";
import ChangePasswordForm from "@/components/ChangePasswordForm/ChangePasswordForm";
import styles from "./account.module.scss";

export default async function AccountPage() {
  const session = await getServerSession();
  if (session === null) {
    return redirect("/login")
  }
  return (
    <main>
      <div className="container">
        <div className={styles.wrapper}>
          <Tabs.Root defaultValue={"my-orders"}>
            <Tabs.List className={styles.TabList}>
              <Tabs.Trigger value="my-orders" className={styles.TabTrigger}>
                <MdOutlineShoppingCartCheckout /> My Orders
              </Tabs.Trigger>
              <Tabs.Trigger value="wish-list" className={styles.TabTrigger}>
                <FaRegHeart /> Wish List
              </Tabs.Trigger>
              <Tabs.Trigger value="billing" className={styles.TabTrigger}>
                <HiOutlineReceiptRefund /> Billing
              </Tabs.Trigger>
              <Tabs.Trigger value="account-info" className={styles.TabTrigger}>
                <FaRegUser /> Account Info
              </Tabs.Trigger>
              <Tabs.Trigger
                value="change-password"
                className={styles.TabTrigger}
              >
                <RiLockPasswordLine /> Change Password
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="my-orders" className={styles.TabContent}>
              My Orders
            </Tabs.Content>
            <Tabs.Content value="wish-list" className={styles.TabContent}>
              Wish List
            </Tabs.Content>
            <Tabs.Content value="billing" className={styles.TabContent}>
              Billing
            </Tabs.Content>
            <Tabs.Content value="account-info" className={styles.TabContent}>
              <AccountForm />
            </Tabs.Content>
            <Tabs.Content value="change-password" className={styles.TabContent}>
              <ChangePasswordForm />
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </main>
  );
}
