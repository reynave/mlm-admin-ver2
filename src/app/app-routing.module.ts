import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DistributorComponent } from './distributor/distributor.component';
import { NewDistributorComponent } from './distributor/new-distributor/new-distributor.component';
import { HomeComponent } from './home/home.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PackageComponent } from './product/package/package.component';
import { PricingComponent } from './product/pricing/pricing.component';
import { RebateDetailComponent } from './rebate/rebate-detail/rebate-detail.component';
import { RebateComponent } from './rebate/rebate.component';
import { TopupDetailComponent } from './topup/topup-detail/topup-detail.component';
import { TopupHistoryComponent } from './topup/topup-history/topup-history.component';
import { TopupComponent } from './topup/topup.component';
import { DraftComponent } from './transaction/draft/draft.component';
import { TransactionDetailComponent } from './transaction/transaction-detail/transaction-detail.component';
import { TransactionHistoryComponent } from './transaction/transaction-history/transaction-history.component';
import { TransactionComponent } from './transaction/transaction.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './guard/auth.guard';
import { ReloginComponent } from './login/relogin/relogin.component';
import { ProfitComponent } from './profit/profit.component';
import { ProfitDetailComponent } from './profit/profit-detail/profit-detail.component';
import { CsvReviewComponent } from './profit/csv-review/csv-review.component';
import { HistoryDistributorComponent } from './distributor/history-distributor/history-distributor.component';
import { ComSponsorComponent } from './com-sponsor/com-sponsor.component';
import { ComPassupComponent } from './com-passup/com-passup.component';
import { ComPairComponent } from './com-pair/com-pair.component';
import { ComRewardComponent } from './com-reward/com-reward.component';
import { ComPairTransComponent } from './com-pair/com-pair-trans/com-pair-trans.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { BinaryChartComponent } from './binary-chart/binary-chart.component';
import { AccountTradingComponent } from './account-trading/account-trading.component';
import { ProfitSettingComponent } from './profit-setting/profit-setting.component';
import { ComRewardHistoryComponent } from './com-reward/com-reward-history/com-reward-history.component';
import { RenewalComponent } from './renewal/renewal.component';
import { MembershipComponent } from './membership/membership.component';
import { AdminComponent } from './admin/admin.component';
import { VerivedComponent } from './verived/verived.component';

const routes: Routes = [
  { path: "", component: LoginComponent, data: { active: "" } },
  { path: "login", component: LoginComponent, data: { active: "login" } },
  { path: "relogin", component: ReloginComponent, data: { active: "Login expired" } },
  
  { path: "home", component: HomeComponent, data: { active: "home" }, canActivate: [AuthGuard] },

  { path: "package", component: PackageComponent, data: { active: "package" }, canActivate: [AuthGuard] },
  



  { path: "distributor", component: DistributorComponent, data: { active: "distributor" }, canActivate: [AuthGuard] },
  { path: "distributor/history", component: HistoryDistributorComponent, data: { active: "distributor" }, canActivate: [AuthGuard] },
  { path: "binaryChart", component: BinaryChartComponent, data: { active: "distributor" }, canActivate: [AuthGuard] },



  { path: "newDistributor", component: NewDistributorComponent, data: { active: "distributor" }, canActivate: [AuthGuard] },

  { path: "transaction", component: TransactionComponent, data: { active: "transaction" }, canActivate: [AuthGuard] },
  { path: "transaction/history", component: TransactionHistoryComponent, data: { active: "transaction" }, canActivate: [AuthGuard] },
  { path: "transaction/draft", component: DraftComponent, data: { active: "transaction" }, canActivate: [AuthGuard] },
  { path: "transaction/detail/:transactionCode", component: TransactionDetailComponent, data: { active: "transaction" }, canActivate: [AuthGuard] },
  { path: "withdraw", component: WithdrawComponent, data: { active: "transaction" }, canActivate: [AuthGuard] },
 
  { path: "renewal", component: RenewalComponent, data: { active: "renewal" }, canActivate: [AuthGuard] },

  { path: "topup", component: TopupComponent, data: { active: "topup" }, canActivate: [AuthGuard] },
 





  { path: "invoice", component: InvoiceComponent, data: { active: "transaction" }, canActivate: [AuthGuard] },

  { path: "rebate", component: RebateComponent, data: { active: "rebate" }, canActivate: [AuthGuard] },
  { path: "rebate/detail/:date", component: RebateDetailComponent, data: { active: "rebate" }, canActivate: [AuthGuard] },

  { path: "profit", component: ProfitComponent, data: { active: "k21" }, canActivate: [AuthGuard] },
  { path: "profit/detail/:date", component: ProfitDetailComponent, data: { active: "k21" }, canActivate: [AuthGuard] },
  { path: "profit/csv/:id", component: CsvReviewComponent, data: { active: "k21" }, canActivate: [AuthGuard] },

  { path: "accountTrading", component: AccountTradingComponent, data: { active: "k21" }, canActivate: [AuthGuard] },
  { path: "profitSetting", component: ProfitSettingComponent, data: { active: "k21" }, canActivate: [AuthGuard] },



  { path: "user", component: UserComponent, data: { active: "user" }, canActivate: [AuthGuard] },
  { path: "user/:id", component: UserDetailComponent, data: { active: "user" }, canActivate: [AuthGuard] },
  { path: "membership", component: MembershipComponent, data: { active: "user" }, canActivate: [AuthGuard] },
  { path: "admin", component: AdminComponent, data: { active: "user" }, canActivate: [AuthGuard] },
  
  { path: "verived", component: VerivedComponent, data: { active: "user" }, canActivate: [AuthGuard] },
 

  { path: "comSponsor", component: ComSponsorComponent, data: { active: "com" }, canActivate: [AuthGuard] },
  { path: "comPassup", component: ComPassupComponent, data: { active: "com" }, canActivate: [AuthGuard] },
  { path: "comPairing", component: ComPairComponent, data: { active: "com" }, canActivate: [AuthGuard] },
  { path: "comPairing/transaction/:userId", component: ComPairTransComponent, data: { active: "com" }, canActivate: [AuthGuard] },
  
  { path: "comReward", component: ComRewardComponent, data: { active: "com" }, canActivate: [AuthGuard] },
  { path: "comReward/history/:code", component: ComRewardHistoryComponent, data: { active: "com" }, canActivate: [AuthGuard] },




  { path: "notFound", component: NotFoundComponent, data: { active: "404" } },
  { path: "**", component: NotFoundComponent, data: { active: "404" } },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
