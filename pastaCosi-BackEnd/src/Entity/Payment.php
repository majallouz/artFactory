<?php

namespace App\Entity;

use App\Repository\PaymentRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PaymentRepository::class)
 */
class Payment
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $TotalPrice;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $PaidPrice;

    /**
     * @ORM\ManyToOne(targetEntity=Account::class)
     */
    private $account;

    function __construct() {
        print "Dans le constructeur de BaseClass\n";
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTotalPrice(): ?int
    {
        return $this->TotalPrice;
    }

    public function setTotalPrice(?int $TotalPrice): self
    {
        $this->TotalPrice = $TotalPrice;

        return $this;
    }

    public function getPaidPrice(): ?int
    {
        return $this->PaidPrice;
    }

    public function setPaidPrice(?int $PaidPrice): self
    {
        $this->PaidPrice = $PaidPrice;

        return $this;
    }

    public function getAccount(): ?Account
    {
        return $this->account;
    }

    public function setAccount(?Account $account): self
    {
        $this->account = $account;

        return $this;
    }
}
